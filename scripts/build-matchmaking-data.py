#!/usr/bin/env python3
"""Generates v2-matchmaking-data.js from the private member mapping workbook.

Source: input/GCC-Members-ESG-Mapping.xlsx (gitignored, never committed or
deployed). Only public-safe fields reach the output file: company name,
website, service description, categories and service keywords, and only for
companies the workbook marks as confirmed ESG providers (ESG Provider = Yes)
with screening confidence High or Medium. Everything else stays private:
Partial/Low-confidence entries, adopter and partner ratings, confidence
levels, review notes, source URLs, business profiles and the entire
Strategic Partners / Top Adopters sheets.

Re-runnable: python3 scripts/build-matchmaking-data.py
Fails loudly if the workbook introduces a category with no translation here.
"""
import json
import sys
from pathlib import Path
from collections import OrderedDict

try:
    import openpyxl
except ImportError:
    sys.exit("openpyxl is required: pip3 install openpyxl")

ROOT = Path(__file__).resolve().parent.parent
WB_PATH = ROOT / "input" / "GCC-Members-ESG-Mapping.xlsx"
OUT_PATH = ROOT / "v2-matchmaking-data.js"
# Public taxonomy only (id + EN label + example) for api/match.js — the free
# text classifier never sees provider or member data.
TAXONOMY_PATH = ROOT / "api" / "match-taxonomy.json"
# Public provider fields for the api/chat.js assistant grounding — identical
# public-safe subset that already ships to every browser in the frontend file.
CHAT_PROVIDERS_PATH = ROOT / "api" / "chat-providers.json"

# Matchmaking taxonomy: slug + label translations. The EN label must match
# the workbook's "Matchmaking Taxonomy" sheet exactly; ZH/DE/VI are UI copy
# maintained here (VI pending native review, like all VI strings).
CATEGORIES = OrderedDict([
    ("ESG strategy and roadmap", {
        "id": "esg-strategy",
        "zh": "ESG战略与路线图", "de": "ESG-Strategie und Roadmap", "vi": "Chiến lược và lộ trình ESG"}),
    ("Carbon accounting and decarbonisation", {
        "id": "carbon",
        "zh": "碳核算与脱碳", "de": "CO₂-Bilanzierung und Dekarbonisierung", "vi": "Kiểm kê carbon và khử carbon"}),
    ("CBAM calculation and reporting", {
        "id": "cbam",
        "zh": "CBAM计算与申报", "de": "CBAM-Berechnung und -Berichterstattung", "vi": "Tính toán và báo cáo CBAM"}),
    ("Digital Product Passport and product traceability", {
        "id": "dpp",
        "zh": "数字产品护照与产品追溯", "de": "Digitaler Produktpass und Produktrückverfolgbarkeit", "vi": "Hộ chiếu sản phẩm số và truy xuất nguồn gốc"}),
    ("ESG reporting and assurance", {
        "id": "reporting",
        "zh": "ESG报告与鉴证", "de": "ESG-Berichterstattung und Prüfung", "vi": "Báo cáo và đảm bảo ESG"}),
    ("Supply-chain due diligence", {
        "id": "due-diligence",
        "zh": "供应链尽职调查", "de": "Lieferketten-Sorgfaltspflichten", "vi": "Thẩm định chuỗi cung ứng"}),
    ("Human rights and social compliance", {
        "id": "social",
        "zh": "人权与社会合规", "de": "Menschenrechte und Sozialcompliance", "vi": "Nhân quyền và tuân thủ xã hội"}),
    ("Testing, inspection and certification", {
        "id": "testing",
        "zh": "检测、检验与认证", "de": "Prüfung, Inspektion und Zertifizierung", "vi": "Thử nghiệm, kiểm định và chứng nhận"}),
    ("Sustainable product and packaging compliance", {
        "id": "product-packaging",
        "zh": "可持续产品与包装合规", "de": "Nachhaltige Produkt- und Verpackungscompliance", "vi": "Tuân thủ sản phẩm và bao bì bền vững"}),
    ("Circular economy, waste and recycling", {
        "id": "circular",
        "zh": "循环经济、废弃物与回收", "de": "Kreislaufwirtschaft, Abfall und Recycling", "vi": "Kinh tế tuần hoàn, chất thải và tái chế"}),
    ("Renewable energy and energy efficiency", {
        "id": "energy",
        "zh": "可再生能源与能效", "de": "Erneuerbare Energien und Energieeffizienz", "vi": "Năng lượng tái tạo và hiệu quả năng lượng"}),
    ("Sustainable logistics and transport", {
        "id": "logistics",
        "zh": "可持续物流与运输", "de": "Nachhaltige Logistik und Transport", "vi": "Hậu cần và vận tải bền vững"}),
    ("Green finance and sustainable investment", {
        "id": "finance",
        "zh": "绿色金融与可持续投资", "de": "Green Finance und nachhaltige Investitionen", "vi": "Tài chính xanh và đầu tư bền vững"}),
    ("ESG data, software and analytics", {
        "id": "software",
        "zh": "ESG数据、软件与分析", "de": "ESG-Daten, Software und Analytik", "vi": "Dữ liệu, phần mềm và phân tích ESG"}),
    ("Training and capability building", {
        "id": "training",
        "zh": "培训与能力建设", "de": "Training und Kompetenzaufbau", "vi": "Đào tạo và xây dựng năng lực"}),
    ("Legal and regulatory advice", {
        "id": "legal",
        "zh": "法律与监管咨询", "de": "Rechts- und Regulierungsberatung", "vi": "Tư vấn pháp lý và quy định"}),
    ("Sustainable materials and product design", {
        "id": "materials",
        "zh": "可持续材料与产品设计", "de": "Nachhaltige Materialien und Produktdesign", "vi": "Vật liệu bền vững và thiết kế sản phẩm"}),
    ("Community impact and employee engagement", {
        "id": "community",
        "zh": "社区影响与员工参与", "de": "Community-Engagement und Mitarbeiterbeteiligung", "vi": "Tác động cộng đồng và gắn kết nhân viên"}),
])


def sheet_rows(ws):
    it = ws.iter_rows(values_only=True)
    header = next(it)
    for r in it:
        if all(c is None or str(c).strip() == "" for c in r):
            continue
        yield dict(zip(header, r))


def js_str(s):
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip() + '"'


def main():
    if not WB_PATH.exists():
        sys.exit(f"Workbook not found: {WB_PATH}")
    wb = openpyxl.load_workbook(WB_PATH, data_only=True)

    tax = list(sheet_rows(wb["Matchmaking Taxonomy"]))
    wb_cats = [t["Dropdown Category"] for t in tax]
    unknown = [c for c in wb_cats if c not in CATEGORIES]
    if unknown:
        sys.exit(f"Untranslated categories in workbook, add them to CATEGORIES: {unknown}")
    examples = {t["Dropdown Category"]: str(t["Example Free-Text Request"]).strip() for t in tax}

    providers = OrderedDict()
    excluded = []
    for row in sheet_rows(wb["Providers by Category"]):
        cat = str(row["Category"]).strip()
        if cat not in CATEGORIES:
            sys.exit(f"Unknown category in Providers by Category: {cat}")
        name = str(row["Company"]).strip()
        if row.get("ESG Provider") != "Yes" or row.get("Confidence") == "Low":
            excluded.append((name, cat, row.get("ESG Provider"), row.get("Confidence")))
            continue
        website = str(row.get("Website") or "").strip()
        if not website.startswith("http"):
            excluded.append((name, cat, "no website", ""))
            continue
        p = providers.setdefault(name, {
            "name": name, "website": website,
            "offering": str(row.get("Offering") or "").strip(),
            "categories": [], "keywords": []})
        p["categories"].append(CATEGORIES[cat]["id"])
        # keep the longest public offering text seen for the company
        off = str(row.get("Offering") or "").strip()
        if len(off) > len(p["offering"]):
            p["offering"] = off
        for kw in str(row.get("Keywords") or "").split(";"):
            kw = kw.strip()
            if kw and kw.lower() not in [k.lower() for k in p["keywords"]]:
                p["keywords"].append(kw)

    providers = OrderedDict(sorted(providers.items(), key=lambda kv: kv[0].lower()))

    lines = []
    lines.append("// GENERATED FILE, do not edit by hand.")
    lines.append("// Built by scripts/build-matchmaking-data.py from the private member")
    lines.append("// mapping workbook. Contains only public-safe fields for confirmed ESG")
    lines.append("// service providers among Chamber member companies. Listings are based")
    lines.append("// on publicly available company information and are not an endorsement.")
    lines.append("window.V2MATCH = {")
    lines.append("    categories: [")
    for en, meta in CATEGORIES.items():
        ex = examples.get(en, "")
        lines.append(f"        {{ id: {js_str(meta['id'])}, en: {js_str(en)}, zh: {js_str(meta['zh'])}, de: {js_str(meta['de'])}, vi: {js_str(meta['vi'])}, example: {js_str(ex)} }},")
    lines.append("    ],")
    lines.append("    providers: [")
    for p in providers.values():
        cats = "[" + ", ".join(js_str(c) for c in p["categories"]) + "]"
        kws = "[" + ", ".join(js_str(k) for k in p["keywords"]) + "]"
        lines.append(f"        {{ name: {js_str(p['name'])}, website: {js_str(p['website'])}, offering: {js_str(p['offering'])}, categories: {cats}, keywords: {kws} }},")
    lines.append("    ]")
    lines.append("};")
    OUT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")

    taxonomy = [{"id": m["id"], "label": en, "example": examples.get(en, "")}
                for en, m in CATEGORIES.items()]
    TAXONOMY_PATH.write_text(json.dumps(taxonomy, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {TAXONOMY_PATH.relative_to(ROOT)}: {len(taxonomy)} categories")

    chat_providers = [{"name": p["name"], "website": p["website"],
                       "categories": p["categories"], "offering": p["offering"]}
                      for p in providers.values()]
    CHAT_PROVIDERS_PATH.write_text(json.dumps(chat_providers, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {CHAT_PROVIDERS_PATH.relative_to(ROOT)}: {len(chat_providers)} providers")

    n_entries = sum(len(p["categories"]) for p in providers.values())
    print(f"Wrote {OUT_PATH.name}: {len(providers)} providers, {n_entries} category entries, {len(CATEGORIES)} categories")
    cat_counts = {}
    for p in providers.values():
        for c in p["categories"]:
            cat_counts[c] = cat_counts.get(c, 0) + 1
    empty = [m["id"] for m in CATEGORIES.values() if m["id"] not in cat_counts]
    if empty:
        print("Categories without a listed provider (shown with a contact-the-Chamber fallback):", ", ".join(empty))
    if excluded:
        seen = sorted({f"{n} ({reason or conf})" for n, c, reason, conf in excluded})
        print(f"\nExcluded from the public dataset ({len(excluded)} rows, pending manual confirmation):")
        for s in seen:
            print("  -", s)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Sep 2026 member-mapping refresh: the seven companies added to the workbook
on 2026-09-21 carried research-note language in their Offering column
("No specific ... service is verified", "Evidence is group-level ...
requiring confirmation"). That column is published verbatim on Find Support
and Our Partners, so the notes are rewritten here into the established
public style (facts kept, internal verification commentary removed, nothing
invented). Ernst & Young keeps a scope caveat mirroring the existing
Deloitte precedent ("local scope should be confirmed before referral").

Idempotent: python3 scripts/seeds/polish-offerings-sep21.py
Then regenerate: python3 scripts/build-matchmaking-data.py
"""
import shutil
import sys
from datetime import date
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent.parent
WB_PATH = ROOT / "input" / "GCC-Members-ESG-Mapping.xlsx"

OFFERINGS = {
    "GS1 Hong Kong":
        "Offers an ESG supply-chain SaaS platform for Scope 3 measurement, monitoring, reporting, supplier engagement and data validation, plus Digital Product Passport support, ESG product data models, recycling initiatives and Quality Food Scheme ESG recognition.",
    "HDS International Group":
        "Provides logistics consulting as a certified Lean and Green Tool Coach, including measurement of logistics-related CO₂ emissions, logistics-structure optimisation and documentation for recognition under the Lean and Green Initiative.",
    "BluKonzept Consulting":
        "Advises on sustainability strategy, resource and waste management, circular practices, energy-efficient infrastructure and renewable-energy adoption.",
    "Deartree Circular Furniture (HK) Limited":
        "Provides office-furniture sales, leasing, recycling and refurbishment services with a circular-economy focus for enterprises across Asia.",
    "Lim-Loges & Masters":
        "Offers customised sustainability and ESG people solutions through workshops and full-service programmes, including sustainability roadmaps, sustainable culture, GHG scopes and diversity, equity, inclusion and retention.",
    "Ernst & Young":
        "Provides ESG strategy and governance, performance and impact analysis, climate stress testing and scenario modelling, ESG risk and due diligence, reporting and third-party assurance, training, green-finance advisory and PRI application support; local scope should be confirmed before referral.",
    "Hafen Hamburg Marketing e.V.":
        "Supports members with funding projects and applications, project and communications management, sustainable transport concepts and access to green-logistics project expertise.",
}


def main():
    if not WB_PATH.exists():
        sys.exit(f"Workbook not found: {WB_PATH}")
    wb = openpyxl.load_workbook(WB_PATH)
    prov = wb["Providers by Category"]
    header = [c.value for c in prov[1]]
    co_col = header.index("Company") + 1
    off_col = header.index("Offering") + 1

    changed = 0
    for row in prov.iter_rows(min_row=2):
        co = row[co_col - 1].value
        if co in OFFERINGS and row[off_col - 1].value != OFFERINGS[co]:
            row[off_col - 1].value = OFFERINGS[co]
            changed += 1
            print(f"Rewrote offering: {co}")

    if changed:
        backup = WB_PATH.with_name(f"GCC-Members-ESG-Mapping.backup-{date.today().isoformat()}.xlsx")
        if not backup.exists():
            shutil.copy2(WB_PATH, backup)
            print(f"Backup written: {backup.name}")
        wb.save(WB_PATH)
        print(f"Workbook saved ({changed} rows). Now run: python3 scripts/build-matchmaking-data.py")
    else:
        print("No changes needed.")


if __name__ == "__main__":
    main()

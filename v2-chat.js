// Hub Assistant: floating chat widget (bottom right on every page), backed
// by /api/chat (Grok). UI chrome uses the shared lang-span system so the
// language toggle applies; history persists per tab in sessionStorage.
// Offline or unconfigured API → contact-the-Committee fallback message.
(function () {
    'use strict';
    if (document.getElementById('gccChatBtn')) return;

    const lang = () => localStorage.getItem('gcc-lang') || 'en';
    const HISTORY_KEY = 'gcc-chat-v1';
    const MAX_SENT = 10;       // messages sent to the API per turn
    const MAX_KEPT = 40;       // messages kept in session history

    function span4(en, zh, de, vi) {
        return `<span class="lang-en">${en}</span><span class="lang-zh">${zh}</span><span class="lang-de">${de}</span><span class="lang-vi">${vi}</span>`;
    }

    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Minimal markdown: [text](url) for whitelisted targets, **bold**, line
    // breaks. Everything else stays escaped text.
    const LINK_RE = /\[([^\]\n]{1,80})\]\(((?:v2-[a-z-]+\.html|index\.html|regulation\.html|article\.html)(?:[?#][\w=&;#-]*)?|https:\/\/[^\s)]+|mailto:[^\s)]+)\)/g;
    function renderMd(text) {
        let html = esc(text);
        html = html.replace(LINK_RE, (m, label, url) => {
            const ext = url.startsWith('https://');
            return `<a href="${esc(url)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
        });
        html = html.replace(/\*\*([^*\n]{1,120})\*\*/g, '<strong>$1</strong>');
        return html.replace(/\n/g, '<br>');
    }

    const GREETING = span4(
        'Hello! I can help you find requirements, deadlines, tools and support from Chamber member companies. What are you looking for?',
        '您好！我可以帮您查找相关要求、期限、工具，以及商会会员企业的支持。您在寻找什么？',
        'Hallo! Ich helfe Ihnen, Anforderungen, Fristen, Tools und Unterstützung durch Kammermitglieder zu finden. Wonach suchen Sie?',
        'Xin chào! Tôi có thể giúp bạn tìm yêu cầu, thời hạn, công cụ và hỗ trợ từ các công ty thành viên. Bạn đang tìm gì?');

    const FALLBACK = span4(
        'The assistant is not available right now. You can find member companies via <a href="v2-matchmaking.html">Find Support</a> or write to the Committee at <a href="mailto:info@hongkong.ahk.de">info@hongkong.ahk.de</a>.',
        '助手暂时不可用。您可以通过<a href="v2-matchmaking.html">寻找支持</a>查找会员企业，或发邮件至<a href="mailto:info@hongkong.ahk.de">info@hongkong.ahk.de</a>联系委员会。',
        'Der Assistent ist gerade nicht verfügbar. Mitgliedsunternehmen finden Sie über <a href="v2-matchmaking.html">Unterstützung finden</a>, oder schreiben Sie an <a href="mailto:info@hongkong.ahk.de">info@hongkong.ahk.de</a>.',
        'Trợ lý hiện không khả dụng. Bạn có thể tìm công ty thành viên qua <a href="v2-matchmaking.html">Tìm hỗ trợ</a> hoặc viết thư cho Ủy ban tại <a href="mailto:info@hongkong.ahk.de">info@hongkong.ahk.de</a>.');

    const SUGGESTIONS = [
        { en: 'Which requirements apply to my product?', zh: '哪些要求适用于我的产品？', de: 'Welche Anforderungen gelten für mein Produkt?', vi: 'Yêu cầu nào áp dụng cho sản phẩm của tôi?' },
        { en: 'Find a partner for carbon accounting', zh: '寻找碳核算方面的伙伴', de: 'Einen Partner für CO₂-Bilanzierung finden', vi: 'Tìm đối tác về kiểm kê carbon' },
        { en: 'What is CBAM and does it affect me?', zh: '什么是CBAM？它会影响我吗？', de: 'Was ist CBAM und betrifft es mich?', vi: 'CBAM là gì và có ảnh hưởng đến tôi không?' }
    ];

    const PLACEHOLDER = { en: 'Type your question...', zh: '请输入您的问题...', de: 'Ihre Frage eingeben...', vi: 'Nhập câu hỏi của bạn...' };

    // ===== DOM =====
    const btn = document.createElement('button');
    btn.id = 'gccChatBtn';
    btn.className = 'gcc-chat-btn';
    btn.type = 'button';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'gccChatPanel');
    btn.setAttribute('aria-label', 'Hub Assistant chat');
    btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

    const panel = document.createElement('div');
    panel.id = 'gccChatPanel';
    panel.className = 'gcc-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Hub Assistant');
    panel.hidden = true;
    panel.innerHTML = `
        <div class="gcc-chat-head">
            <div class="gcc-chat-head-text">
                <strong>${span4('Hub Assistant', 'Hub助手', 'Hub-Assistent', 'Trợ lý Hub')}</strong>
                <span class="gcc-chat-sub">${span4('AI answers can contain mistakes and are not legal advice.', 'AI回答可能有误，不构成法律意见。', 'KI-Antworten können Fehler enthalten und sind keine Rechtsberatung.', 'Câu trả lời AI có thể sai sót và không phải tư vấn pháp lý.')}</span>
            </div>
            <button type="button" class="gcc-chat-close" id="gccChatClose" aria-label="Close chat">&#10005;</button>
        </div>
        <div class="gcc-chat-log" id="gccChatLog" aria-live="polite"></div>
        <div class="gcc-chat-sugg" id="gccChatSugg"></div>
        <form class="gcc-chat-form" id="gccChatForm">
            <input type="text" id="gccChatInput" maxlength="1000" autocomplete="off">
            <button type="submit" class="gcc-chat-send" aria-label="Send message"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
        </form>`;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    const log = panel.querySelector('#gccChatLog');
    const sugg = panel.querySelector('#gccChatSugg');
    const form = panel.querySelector('#gccChatForm');
    const input = panel.querySelector('#gccChatInput');

    SUGGESTIONS.forEach(s => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'gcc-chat-chip';
        b.innerHTML = span4(s.en, s.zh, s.de, s.vi);
        b.addEventListener('click', () => { send(s[lang()] || s.en); });
        sugg.appendChild(b);
    });

    const setPlaceholder = () => { input.placeholder = PLACEHOLDER[lang()] || PLACEHOLDER.en; };
    setPlaceholder();
    document.getElementById('langSelect')?.addEventListener('change', setPlaceholder);

    // ===== History =====
    let history = [];
    try { history = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]'); } catch (e) { history = []; }
    if (!Array.isArray(history)) history = [];

    function save() {
        history = history.slice(-MAX_KEPT);
        try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) { /* full */ }
    }

    function bubble(role, html) {
        const div = document.createElement('div');
        div.className = 'gcc-chat-msg gcc-chat-' + role;
        div.innerHTML = html;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
        return div;
    }

    function paint() {
        log.innerHTML = '';
        bubble('assistant', GREETING);
        history.forEach(m => bubble(m.role, m.role === 'user' ? esc(m.content) : renderMd(m.content)));
        sugg.style.display = history.length ? 'none' : '';
    }

    // ===== Send =====
    let busy = false;
    async function send(text) {
        text = (text || '').trim().slice(0, 1000);
        if (!text || busy) return;
        busy = true;
        input.value = '';
        history.push({ role: 'user', content: text });
        save();
        sugg.style.display = 'none';
        bubble('user', esc(text));
        const typing = bubble('assistant', '<span class="gcc-chat-typing" aria-hidden="true"><i></i><i></i><i></i></span>');
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history.slice(-MAX_SENT), lang: lang() })
            });
            const data = res.ok ? await res.json() : null;
            if (data && typeof data.reply === 'string' && data.reply) {
                history.push({ role: 'assistant', content: data.reply });
                save();
                typing.innerHTML = renderMd(data.reply);
            } else {
                typing.innerHTML = FALLBACK;
            }
        } catch (e) {
            typing.innerHTML = FALLBACK;
        }
        log.scrollTop = log.scrollHeight;
        busy = false;
    }

    form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });

    // ===== Open/close =====
    function setOpen(open) {
        panel.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
        btn.classList.toggle('gcc-chat-btn-open', open);
        if (open) { paint(); input.focus(); }
    }

    btn.addEventListener('click', () => setOpen(panel.hidden));
    panel.querySelector('#gccChatClose').addEventListener('click', () => { setOpen(false); btn.focus(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !panel.hidden) { setOpen(false); btn.focus(); }
    });
})();

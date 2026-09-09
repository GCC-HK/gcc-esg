// POST /api/subscribe — adds a contact to the Resend audience and sends a
// bilingual confirmation email. Requires env vars:
//   RESEND_API_KEY     (required)
//   RESEND_AUDIENCE_ID (optional — contact list for the weekly briefing)
//   RESEND_FROM        (optional — defaults to Resend's onboarding sender,
//                       which only delivers to the account owner's inbox;
//                       set to e.g. "GCC ESG Sourcing Hub <briefing@send.gcchk-esg.com>"
//                       once the domain is verified)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'method_not_allowed' });
    }

    const { email, consent, lang } = req.body || {};

    if (!consent) {
        return res.status(400).json({ error: 'consent_required' });
    }
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254) {
        return res.status(400).json({ error: 'invalid_email' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        // Deployed but not yet configured — frontend shows a friendly notice
        return res.status(503).json({ error: 'not_configured' });
    }

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    try {
        const audienceId = process.env.RESEND_AUDIENCE_ID;
        if (audienceId) {
            const contactRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ email, unsubscribed: false })
            });
            // 409 = already subscribed; treat as success
            if (!contactRes.ok && contactRes.status !== 409) {
                const detail = await contactRes.text();
                console.error('Resend contact error:', contactRes.status, detail);
                return res.status(502).json({ error: 'subscription_failed' });
            }
        }

        const zh = lang === 'zh';
        const from = process.env.RESEND_FROM || 'GCC ESG Sourcing Hub <onboarding@resend.dev>';
        const subject = zh
            ? '订阅确认 | ESG采购简报'
            : 'Subscription confirmed | The ESG Sourcing Briefing';
        const html = zh
            ? `<p>您好，</p>
               <p>感谢您订阅德国工商总会香港（GCC）ESG委员会的<strong>ESG采购简报</strong>。</p>
               <p>您将收到与香港采购办公室及其中国制造商相关的欧盟法规动态：CBAM、EUDR、包装法规、电池法规等。</p>
               <p>如需退订，回复本邮件即可。</p>
               <p>GCC ESG委员会<br>info@hongkong.ahk.de</p>`
            : `<p>Hello,</p>
               <p>Thank you for subscribing to the <strong>ESG Sourcing Briefing</strong> by the GCC ESG Committee (German Chamber of Commerce, Hong Kong).</p>
               <p>You will receive updates on EU regulations relevant to Hong Kong sourcing offices and their manufacturers in China: CBAM, EUDR, packaging rules, the Batteries Regulation and more.</p>
               <p>To unsubscribe, simply reply to this email.</p>
               <p>GCC ESG Committee<br>info@hongkong.ahk.de</p>`;

        const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers,
            body: JSON.stringify({ from, to: [email], subject, html })
        });

        if (!emailRes.ok) {
            const detail = await emailRes.text();
            console.error('Resend email error:', emailRes.status, detail);
            // Contact was stored; confirmation failed — still report success,
            // the subscription itself is what matters
            return res.status(200).json({ ok: true, confirmation: false });
        }

        return res.status(200).json({ ok: true, confirmation: true });
    } catch (err) {
        console.error('subscribe error:', err);
        return res.status(500).json({ error: 'internal_error' });
    }
}

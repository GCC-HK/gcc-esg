// POST /api/member-login  { passcode }
//
// Interim member sign-in that runs entirely on Vercel (owner request
// 2026-09-10, board presentation without Supabase): the Committee sets one
// shared member passcode as the MEMBER_PASSCODE environment variable in
// Vercel. A correct passcode returns a signed, expiring token; api/content.js
// (and the dev server) accept it in the x-member-token header as member tier.
// The passcode never ships in the code or the browser bundle. Replaced by
// Supabase magic-link accounts when real auth goes live.
import crypto from 'node:crypto';

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export function signMemberToken(pass, exp) {
    const sig = crypto.createHmac('sha256', pass).update('member:' + exp).digest('hex');
    return exp + '.' + sig;
}

export function verifyMemberToken(token, pass) {
    if (!token || !pass) return false;
    const [exp, sig] = String(token).split('.');
    if (!exp || !sig || Date.now() > Number(exp)) return false;
    const good = crypto.createHmac('sha256', pass).update('member:' + exp).digest('hex');
    try {
        return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(good, 'hex'));
    } catch {
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
    const pass = process.env.MEMBER_PASSCODE;
    if (!pass) {
        return res.status(503).json({ error: 'not_configured', message: 'Member sign-in is not configured yet (MEMBER_PASSCODE env var not set).' });
    }
    const passcode = (req.body && req.body.passcode) || '';
    const a = Buffer.from(String(passcode));
    const b = Buffer.from(pass);
    const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
    if (!ok) {
        // small constant delay to blunt guessing
        await new Promise(r => setTimeout(r, 600));
        return res.status(401).json({ error: 'wrong_passcode' });
    }
    const exp = Date.now() + TOKEN_TTL_MS;
    return res.status(200).json({ token: signMemberToken(pass, exp), tier: 'member', expiresAt: exp });
}

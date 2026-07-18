// GET /api/auth-config — public Supabase client configuration.
// The anon key is designed to be public; row-level security and the
// /api/content gating protect the data. Returns 503 until configured.

export default function handler(req, res) {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
        return res.status(503).json({ error: 'not_configured' });
    }
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json({ url, anonKey });
}

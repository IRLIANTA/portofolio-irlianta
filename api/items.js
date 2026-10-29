const U = (process.env.SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, ''), K = (process.env.SUPABASE_SERVICE_KEY || '').trim(), A = (process.env.ADMIN_PASSWORD || '').trim();
module.exports = async (req, res) => {
  const t = req.query.table === 'messages' ? 'messages' : 'items';
  const admin = !!A && req.headers['x-admin'] === A;
  const h = { apikey: K, Authorization: 'Bearer ' + K, 'Content-Type': 'application/json', Prefer: 'return=representation' };
  const base = `${U}/rest/v1/${t}`;
  const id = req.query.id ? `?id=eq.${encodeURIComponent(req.query.id)}` : '';
  try {
    let r;
    if (req.method === 'GET') {
      if (t === 'messages' && !admin) return res.status(401).json({ error: 'unauthorized' });
      const f = req.query.type ? `&type=eq.${encodeURIComponent(req.query.type)}` : '';
      const o = t === 'items' ? 'sort.asc,created_at.desc' : 'created_at.desc';
      r = await fetch(`${base}?select=*&order=${o}${f}`, { headers: h });
    } else if (req.method === 'POST') {
      if (t === 'items' && !admin) return res.status(401).json({ error: 'unauthorized' });
      r = await fetch(base, { method: 'POST', headers: h, body: JSON.stringify(req.body) });
    } else if (['PUT', 'DELETE'].includes(req.method)) {
      if (!admin || !id) return res.status(401).json({ error: 'unauthorized' });
      r = await fetch(base + id, { method: req.method === 'PUT' ? 'PATCH' : 'DELETE', headers: h, body: req.method === 'PUT' ? JSON.stringify(req.body) : undefined });
    } else return res.status(405).end();
    res.status(r.status).send(await r.text());
  } catch (e) { res.status(500).json({ error: String(e) }); }
};

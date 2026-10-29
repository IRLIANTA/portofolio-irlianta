const U = (process.env.SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, ''),
  K = (process.env.SUPABASE_SERVICE_KEY || '').trim(), A = (process.env.ADMIN_PASSWORD || '').trim();
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!A || (req.headers['x-admin'] || '').trim() !== A) return res.status(401).json({ error: 'unauthorized' });
  try {
    const { data, type } = req.body || {};
    if (!data || !/^image\//.test(type || '')) return res.status(400).json({ error: 'File harus berupa gambar' });
    const h = { apikey: K, Authorization: 'Bearer ' + K };
    // buat bucket "images" (publik) otomatis; abaikan jika sudah ada
    await fetch(`${U}/storage/v1/bucket`, { method: 'POST', headers: { ...h, 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'images', name: 'images', public: true }) }).catch(() => {});
    const ext = type.split('/')[1].replace('jpeg', 'jpg').replace(/[^a-z0-9]/g, '');
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const r = await fetch(`${U}/storage/v1/object/images/${name}`, { method: 'POST', headers: { ...h, 'Content-Type': type, 'x-upsert': 'true' }, body: Buffer.from(data, 'base64') });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    res.json({ url: `${U}/storage/v1/object/public/images/${name}` });
  } catch (e) { res.status(500).json({ error: String(e) }); }
};

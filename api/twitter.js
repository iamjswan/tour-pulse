export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'query required' });

  const RAPID_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPID_KEY) return res.status(500).json({ error: 'API key not configured' });

  const url = `https://twitter241.p.rapidapi.com/search-v2?type=Latest&count=20&query=${encodeURIComponent(query)}`;

  try {
    const resp = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'twitter241.p.rapidapi.com',
        'x-rapidapi-key': RAPID_KEY
      }
    });

    if (!resp.ok) {
      return res.status(resp.status).json({ error: `RapidAPI error ${resp.status}` });
    }

    const data = await resp.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

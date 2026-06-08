export default async function handler(req, res) {
  // CORS — allow requests from any origin (our own frontend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { keywords, publish_time } = req.query;
  if (!keywords) return res.status(400).json({ error: 'keywords required' });

  const RAPID_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPID_KEY) return res.status(500).json({ error: 'API key not configured' });

  const url = `https://free-tiktok-api-scraper-mobile-version.p.rapidapi.com/tok/v1/search_video/?keyword=${encodeURIComponent(keywords)}&cursor=0&count=20&region=US`;

  try {
    const resp = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'free-tiktok-api-scraper-mobile-version.p.rapidapi.com',
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

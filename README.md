# Live From The Internet — Conan Gray Tour Pulse

TikTok & Twitter UGC intelligence dashboard for the Wishbone World Tour.

## Setup

### 1. Environment variable
In Vercel, add one environment variable:
```
RAPIDAPI_KEY = your_key_here
```

### 2. Deploy
Push to GitHub. Connect repo to Vercel. It deploys automatically.

### 3. Use
Open your Vercel URL. No API key input needed — it's handled server-side.

## Project structure
```
api/
  tiktok.js     — proxies TikTok Scraper7 calls (RapidAPI)
  twitter.js    — proxies twitter241 calls (RapidAPI)
public/
  index.html    — full single-page app
vercel.json     — routing config
```

## Updating
- New tour dates: edit the `WISHBONE_WORLD_TOUR` array in `public/index.html`
- New songs: edit the `CONAN_SONGS` array in `public/index.html`
- Ticket data: upload a new `.xlsx` in the Tickets tab — no code change needed

# Grok Bot for Cloud Software Group

Passworded leave-behind. Grok Bot from SpaceXAI, for Cloud Software Group sellers.

## What it is

Three GTM jobs on one page. Each job has a short problem, an interactive Grok Bot demo, and a finished artifact the seller reviews. Below that is a comparison table and the public Grok Bot quote wall.

The site lockup is Cloud Software Group × SpaceXAI. It loads the official wordmark from `cloud.com`. See `docs/brand-provenance.md`.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default password is `land2expand` (override with `SITE_PASSWORD`).

`SITE_PASSWORD` stays server-only. The app fails closed if it is missing. Do not add `NEXT_PUBLIC` for the password.

## Clips

Keep optional demo clips under `private/media/clips/`. The passworded `/api/media/...` route serves those files. Copy posters to `public/media/clips/` when you want stills on the page.

```bash
node scripts/sync-clips.mjs
```

## Deploy

Preview stays passworded. Set `SITE_PASSWORD=land2expand`. Do not promote to a public production domain until Jason says so.

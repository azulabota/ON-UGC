ON UGC

Stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Auth + Postgres + Storage)
- Vercel (hosting + cron)

Local setup
1) Copy env
   cp .env.example .env.local
2) Fill in Supabase + PiAPI + Stripe keys
3) Install deps
   npm i
4) Run
   npm run dev

Notes
- Do NOT commit secrets.
- Uploads are stored in Supabase Storage and must be retrievable via a URL that PiAPI can fetch.

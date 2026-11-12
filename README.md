# LocalPulse

Local market research for small businesses. Pick a business category and a city, and LocalPulse collects Google Maps data on local competitors, analyses it with AI, and turns it into an insights report and a ready-to-send newsletter.

> **Status:** Working prototype built October–November 2025. Not currently hosted. See [Run locally](#run-locally).

## What it does

- **Research projects:** set a category (e.g. roofing, HVAC, dentists), a city and a search radius, then start a research run.
- **Results and AI insights:** see the businesses found, their ratings and reviews, and AI-written takeaways for each project.
- **Newsletter builder:** arrange content blocks on a canvas, generate the copy with AI, and export to PDF.
- **Shareable reports:** every report gets a public link (`/r/:id`).
- **Credits and plans:** each run shows its credit cost up front, usage is tracked, and there are subscription tiers.

## How it works

```
React app ──► Supabase Edge Functions ──► n8n workflows
               runMarketResearch           Google Maps data (Apify)
               runNewsletter               ─► Google Sheets ─► AI insights
                    │
                    ▼
   generateNewsletterContent (AI)  ·  generateNewsletterPDF (PDFShift)
                    │
                    ▼
       Supabase database: research runs, credits, plans
```

## Tech stack

| Layer | Tools |
|---|---|
| Front end | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Back end | Supabase (PostgreSQL, Auth, Edge Functions) |
| Automation | n8n, Apify Google Maps scraper, Google Sheets |
| AI and docs | LLM content generation, PDFShift for PDF export |

## Project structure

```
src/pages/            Home, dashboard, projects, newsletter builder, pricing, public report
src/components/       Dashboard widgets, project tabs, newsletter canvas, billing
supabase/functions/   runMarketResearch, runNewsletter, generateNewsletterContent, generateNewsletterPDF
supabase/migrations/  Database schema: research runs, user credits, credit usage, plans
```

## Run locally

```bash
npm install
npm run dev
```

The app reads its Supabase settings from `.env`. The edge functions need `N8N_LEADGEN_WEBHOOK_URL`, `N8N_NEWSLETTER_WEBHOOK_URL` and `N8N_API_KEY` pointing at your n8n workflows.

## How it was built

I built the app with Lovable (an AI app builder) and connected it to my n8n research workflows. Those workflows are adapted from the open-source [local_market_research_n8n](https://github.com/the-vibe-marketers/local_market_research_n8n) template.

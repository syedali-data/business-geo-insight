# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4ecaee90-bcc3-4827-97c8-a81666101433

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4ecaee90-bcc3-4827-97c8-a81666101433) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4ecaee90-bcc3-4827-97c8-a81666101433) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## API Testing

This app uses Lovable Cloud Functions to proxy requests to n8n webhooks. To test the endpoints:

### Test Market Research Endpoint

```bash
curl -X POST https://<your-project-id>.supabase.co/functions/v1/runMarketResearch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-anon-key>" \
  -d '{
    "projectId": "demo",
    "country": "CA",
    "region": "ON",
    "city": "London",
    "radius_km": 25,
    "profession_code": "roofing",
    "profession_label": "Roofing",
    "keywords": ["residential", "commercial"],
    "max_leads": 200,
    "enrich": true,
    "validate_emails": true
  }'
```

### Test Newsletter Endpoint

```bash
curl -X POST https://<your-project-id>.supabase.co/functions/v1/runNewsletter \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-anon-key>" \
  -d '{
    "projectId": "demo",
    "templateId": "default",
    "tone": "professional",
    "length": "standard",
    "sendNow": false
  }'
```

**Required Environment Variables:**

Make sure these secrets are configured in your Supabase project:

- `INTERNAL_N8N_API_KEY` - Your internal API key for n8n webhook authentication
- `N8N_LEADGEN_WEBHOOK_URL` - Your n8n leadgen webhook URL (e.g., `https://your-n8n.com/webhook/lovable/leadgen`)
- `N8N_NEWSLETTER_WEBHOOK_URL` - Your n8n newsletter webhook URL (e.g., `https://your-n8n.com/webhook/lovable/newsletter`)

Expected responses will include `{ status, runId }` from n8n or appropriate error messages if environment variables are missing.

## SPA Fallback for Production Deployments

When deploying to external hosting platforms, ensure SPA fallback is configured:

- **Netlify**: Add to `_redirects`: `/* /index.html 200`
- **Vercel**: Add to `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Other hosts**: Configure all routes to serve `index.html`

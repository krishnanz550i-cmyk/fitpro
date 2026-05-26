# FitPro — Setup Guide

Complete step-by-step setup. Follow in order.

---

## Step 1 — Set up the Supabase database

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Open your FitPro project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**
5. Paste the entire SQL block below and click **Run**:

```sql
-- Profiles table
create table public.profiles (
  id uuid references auth.users(id) primary key,
  name text,
  goal text,
  default_time text,
  duration text,
  health_notes text,
  is_admin boolean default false,
  onboarded boolean default false,
  created_at timestamp with time zone default now()
);

-- Check-ins table
create table public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  feeling text,
  body_areas jsonb,
  completed boolean,
  notes text,
  created_at timestamp with time zone default now()
);

-- Sessions log table
create table public.session_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  duration_minutes int,
  completed boolean,
  notes text,
  created_at timestamp with time zone default now()
);

-- Chat history table
create table public.chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  role text,
  content text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.checkins enable row level security;
alter table public.session_logs enable row level security;
alter table public.chat_history enable row level security;

-- Policies
create policy "Own profile" on public.profiles for all using (auth.uid() = id);
create policy "Own checkins" on public.checkins for all using (auth.uid() = user_id);
create policy "Own sessions" on public.session_logs for all using (auth.uid() = user_id);
create policy "Own chat" on public.chat_history for all using (auth.uid() = user_id);
create policy "Leaderboard read checkins" on public.checkins for select using (true);
create policy "Leaderboard read sessions" on public.session_logs for select using (true);
create policy "Admin reads all profiles" on public.profiles for select
  using (exists (select 1 from public.profiles p2 where p2.id = auth.uid() and p2.is_admin = true));
```

---

## Step 2 — Deploy the Supabase Edge Function

This keeps your Claude API key secure on the server.

### Install Supabase CLI
```bash
npm install -g supabase
```

### Login and link your project
```bash
supabase login
supabase link --project-ref yvjndkkzikeghbcohfsw
```

### Create the function
```bash
mkdir -p supabase/functions/chat
cp supabase-edge-function.ts supabase/functions/chat/index.ts
```

### Add your Claude API key as a secret (never goes in code)
```bash
supabase secrets set CLAUDE_API_KEY=your_claude_api_key_here
```

### Deploy
```bash
supabase functions deploy chat
```

Your Edge Function URL will be:
`https://yvjndkkzikeghbcohfsw.supabase.co/functions/v1/chat`

This is already pre-filled in `js/config.js`.

---

## Step 3 — Configure the app

Open `js/config.js` and fill in:

```javascript
APP_PASSWORD: 'your_chosen_app_password',   // e.g. fitpro2026
ADMIN_EMAIL: 'your_email@example.com',       // your signup email
```

The Supabase URL and anon key are already filled in.

---

## Step 4 — Deploy to GitHub Pages (free hosting)

### Create a GitHub account
Go to https://github.com and sign up (free).

### Create a new repository
1. Click the **+** button → **New repository**
2. Name it `fitpro` (or anything you like)
3. Set to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Upload your files
1. On the repository page, click **uploading an existing file**
2. Drag and drop your entire `fitpro` folder contents
3. Click **Commit changes**

### Enable GitHub Pages
1. Go to your repository → **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Branch: **main**, folder: **/ (root)**
5. Click **Save**

Your app will be live at:
`https://yourusername.github.io/fitpro`

Give it 1–2 minutes to deploy.

---

## Step 5 — Install on your phone (PWA)

### iPhone (Safari)
1. Open your GitHub Pages URL in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Name it **FitPro** and tap **Add**

### Android (Chrome)
1. Open your GitHub Pages URL in Chrome
2. Tap the **three dots** menu → **Add to Home screen**
3. Tap **Add**

FitPro now appears as an app icon on your home screen.

---

## Step 6 — First login

1. Open FitPro and enter your app password
2. Tap **Create account** and sign up with your email
3. Complete the onboarding — goal, time, health conditions
4. You're in! Share the URL with your wife so she can create her own account.

### Making yourself admin
After signing up, go to your Supabase dashboard → **Table Editor** → **profiles**
Find your row and set `is_admin` to `true`. This unlocks the admin panel in the app.

---

## Troubleshooting

**"Edge Function not deployed yet"** — Complete Step 2 above.

**Login not working** — Check Supabase → Authentication → make sure email confirmations are disabled for testing (Settings → Auth → disable "Enable email confirmations").

**App won't load** — Check browser console (F12) for errors. Most common: CORS issue with Edge Function. Re-deploy with `supabase functions deploy chat --no-verify-jwt`.

**GitHub Pages not updating** — Wait 2 minutes after pushing. Check the Actions tab for build status.

---

## Updating the app

When you want to add features:
1. Edit your local files
2. Drag them into GitHub (or use `git push`)
3. GitHub Pages auto-updates within 1 minute

Come back to this Claude conversation to request changes anytime.

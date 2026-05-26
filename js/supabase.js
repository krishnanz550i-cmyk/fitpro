// ─── Supabase Client ───
// Uses the Supabase CDN via script tag loaded dynamically
let supabase = null;

async function initSupabase() {
  if (supabase) return supabase;
  await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js');
  supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  return supabase;
}

function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

// ─── Database Schema Setup ───
// Run this once in your Supabase SQL editor:
/*
-- Profiles table (extends Supabase auth.users)
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

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.checkins enable row level security;
alter table public.session_logs enable row level security;
alter table public.chat_history enable row level security;

-- Policies: users can only read/write their own data
create policy "Own profile" on public.profiles for all using (auth.uid() = id);
create policy "Own checkins" on public.checkins for all using (auth.uid() = user_id);
create policy "Own sessions" on public.session_logs for all using (auth.uid() = user_id);
create policy "Own chat" on public.chat_history for all using (auth.uid() = user_id);

-- Admin can see all profiles (for leaderboard and admin panel)
create policy "Admin sees all profiles" on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- All users can see each other's streak/score for leaderboard (read only)
create policy "Leaderboard read" on public.checkins for select
  using (true);
create policy "Leaderboard sessions" on public.session_logs for select
  using (true);
*/

// ─── Profile helpers ───
async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return null;
  return data;
}

async function upsertProfile(userId, data) {
  const { error } = await supabase.from('profiles').upsert({ id: userId, ...data });
  if (error) throw error;
}

async function getAllProfiles() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) return [];
  return data;
}

// ─── Check-in helpers ───
async function saveCheckin(userId, checkin) {
  const { error } = await supabase.from('checkins').insert({ user_id: userId, ...checkin });
  if (error) throw error;
}

async function getRecentCheckins(userId, limit = 5) {
  const { data, error } = await supabase
    .from('checkins')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return [];
  return data;
}

// ─── Session log helpers ───
async function logSession(userId, session) {
  const { error } = await supabase.from('session_logs').insert({ user_id: userId, ...session });
  if (error) throw error;
}

async function getSessionLogs(userId, limit = 20) {
  const { data, error } = await supabase
    .from('session_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return [];
  return data;
}

// ─── Streak calculator ───
function calculateStreak(sessions) {
  if (!sessions || sessions.length === 0) return 0;
  const dates = sessions
    .filter(s => s.completed)
    .map(s => new Date(s.created_at).toDateString());
  const unique = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
  if (!unique.length) return 0;
  let streak = 0;
  let check = new Date();
  check.setHours(0, 0, 0, 0);
  for (const d of unique) {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    const diff = (check - date) / 86400000;
    if (diff <= 1) { streak++; check = date; }
    else break;
  }
  return streak;
}

// ─── Leaderboard data ───
async function getLeaderboardData() {
  const profiles = await getAllProfiles();
  const result = [];
  for (const p of profiles) {
    const sessions = await getSessionLogs(p.id, 50);
    const streak = calculateStreak(sessions);
    const weekSessions = sessions.filter(s => {
      const d = new Date(s.created_at);
      const now = new Date();
      const weekAgo = new Date(now - 7 * 86400000);
      return s.completed && d > weekAgo;
    }).length;
    result.push({ ...p, streak, weekSessions, totalSessions: sessions.filter(s => s.completed).length });
  }
  return result.sort((a, b) => b.streak - a.streak);
}

// ─── Chat history helpers ───
async function saveChatMessage(userId, role, content) {
  await supabase.from('chat_history').insert({ user_id: userId, role, content });
}

async function getRecentChatHistory(userId, limit = 10) {
  const { data } = await supabase
    .from('chat_history')
    .select('role, content')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (!data) return [];
  return data.reverse();
}

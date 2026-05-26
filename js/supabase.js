let _supabaseClient = null;

function initSupabase() {
  if (_supabaseClient) return _supabaseClient;
  if (!window.supabase || !window.supabase.createClient) {
    throw new Error('Supabase library not loaded');
  }
  _supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  return _supabaseClient;
}

async function getProfile(userId) {
  const sb = initSupabase();
  const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
  if (error) return null;
  return data;
}

async function upsertProfile(userId, data) {
  const sb = initSupabase();
  const { error } = await sb.from('profiles').upsert({ id: userId, ...data });
  if (error) throw error;
}

async function getAllProfiles() {
  const sb = initSupabase();
  const { data, error } = await sb.from('profiles').select('*');
  if (error) return [];
  return data;
}

async function saveCheckin(userId, checkin) {
  const sb = initSupabase();
  const { error } = await sb.from('checkins').insert({ user_id: userId, ...checkin });
  if (error) throw error;
}

async function getRecentCheckins(userId, limit = 5) {
  const sb = initSupabase();
  const { data, error } = await sb.from('checkins').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit);
  if (error) return [];
  return data;
}

async function logSession(userId, session) {
  const sb = initSupabase();
  const { error } = await sb.from('session_logs').insert({ user_id: userId, ...session });
  if (error) throw error;
}

async function getSessionLogs(userId, limit = 20) {
  const sb = initSupabase();
  const { data, error } = await sb.from('session_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit);
  if (error) return [];
  return data;
}

function calculateStreak(sessions) {
  if (!sessions || sessions.length === 0) return 0;
  const dates = sessions.filter(s => s.completed).map(s => new Date(s.created_at).toDateString());
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

async function saveChatMessage(userId, role, content) {
  const sb = initSupabase();
  await sb.from('chat_history').insert({ user_id: userId, role, content });
}

async function getRecentChatHistory(userId, limit = 10) {
  const sb = initSupabase();
  const { data } = await sb.from('chat_history').select('role, content').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit);
  if (!data) return [];
  return data.reverse();
}

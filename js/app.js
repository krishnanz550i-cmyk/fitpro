// ─── Onboarding State ───
const ob = { goal: '', time: '', duration: '', healthNotes: '' };
let obStep = 1;
const OB_TOTAL = 5;

function selectChoice(el, key, val) {
  el.closest('.choice-grid').querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  ob[key] = val;
}

function obNext() {
  if (obStep === 1 && !ob.goal) { showToast('Please pick a goal'); return; }
  if (obStep === 2 && !ob.time) { showToast('Please pick a time'); return; }
  if (obStep === 3 && !ob.duration) { showToast('Please pick a duration'); return; }
  if (obStep === 4) {
    ob.healthNotes = document.getElementById('health-notes').value.trim();
    renderProfilePreview();
  }
  if (obStep === OB_TOTAL) { finishOnboarding(); return; }
  obStep++;
  updateObUI();
}

function obBack() {
  if (obStep === 1) return;
  obStep--;
  updateObUI();
}

function updateObUI() {
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === obStep);
  });
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i + 1 === obStep);
  });
  document.getElementById('ob-back').style.visibility = obStep === 1 ? 'hidden' : 'visible';
  document.getElementById('ob-next').textContent = obStep === OB_TOTAL ? 'Start training' : 'Next';
}

function renderProfilePreview() {
  const labels = {
    goal: { flexibility: 'Flexibility & mobility', strength: 'Strength & muscle', weight_loss: 'Weight loss & cardio', recovery: 'Recovery & pain relief' },
    time: { '6am': 'Early morning (6–8 AM)', '9am': 'Mid morning (8–10 AM)', lunch: 'Lunch break (12–2 PM)', evening: 'Evening (6–9 PM)' },
    duration: { '10': '10–15 min', '20': '20–30 min', '45': '30–45 min', '60': '45–60 min' }
  };
  const el = document.getElementById('profile-preview');
  el.innerHTML = `
    <div><span>Goal</span>${labels.goal[ob.goal] || ob.goal}</div>
    <div><span>Workout time</span>${labels.time[ob.time] || ob.time}</div>
    <div><span>Session length</span>${labels.duration[ob.duration] || ob.duration}</div>
    <div><span>Health notes</span>${ob.healthNotes || 'None provided'}</div>
  `;
}

async function finishOnboarding() {
  showLoading(true);
  try {
    await upsertProfile(currentUser.id, {
      goal: ob.goal,
      default_time: ob.time,
      duration: ob.duration,
      health_notes: ob.healthNotes,
      onboarded: true
    });
    currentProfile = await getProfile(currentUser.id);
    await launchApp();
  } catch (e) {
    showToast('Error saving profile. Please try again.');
  }
  showLoading(false);
}

// ─── App Launch ───
async function launchApp() {
  showScreen('app-screen');
  initTopbar();
  renderSidebar();
  await switchView('today');
  if (currentProfile?.is_admin) {
    document.getElementById('admin-nav').style.display = 'flex';
  }
  checkSupabaseConnection();
}

function initTopbar() {
  const now = new Date();
  document.getElementById('topbar-date').textContent = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

function renderSidebar() {
  if (!currentProfile) return;
  document.getElementById('sidebar-name').textContent = currentProfile.name || 'User';
  document.getElementById('sidebar-role').textContent = currentProfile.is_admin ? 'Admin' : 'Member';
  document.getElementById('sidebar-avatar').textContent = (currentProfile.name || 'U')[0].toUpperCase();
}

// ─── View Switching ───
async function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const view = document.getElementById(`view-${name}`);
  if (view) view.classList.add('active');
  const navItem = document.querySelector(`.nav-item[onclick="switchView('${name}')"]`);
  if (navItem) navItem.classList.add('active');
  const titles = { today: 'Today', chat: 'Chat with trainer', session: 'My session', checkin: 'Body check-in', progress: 'Progress', compete: 'Compete', resources: 'Guides & videos', profile: 'My profile', admin: 'Admin panel' };
  document.getElementById('topbar-title').textContent = titles[name] || name;
  closeSidebar();
  // Load view data
  if (name === 'today') await renderToday();
  else if (name === 'session') await renderSession();
  else if (name === 'checkin') await renderCheckin();
  else if (name === 'progress') await renderProgress();
  else if (name === 'compete') await renderCompete();
  else if (name === 'resources') await loadResources();
  else if (name === 'profile') renderProfile();
  else if (name === 'admin') await renderAdmin();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

// ─── Today View ───
async function renderToday() {
  const p = currentProfile;
  if (!p) return;

  // Greeting
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting-hi').textContent = greet;
  document.getElementById('greeting-name').textContent = p.name || 'there';

  // Safety notice for health conditions
  const notice = document.getElementById('safety-notice');
  if (p.health_notes && p.health_notes.trim()) {
    notice.style.display = 'flex';
    const keywords = [];
    if (/spine|nerve|compression/i.test(p.health_notes)) keywords.push('nerve compression');
    if (/acl|knee/i.test(p.health_notes)) keywords.push('ACL/knee');
    if (/back/i.test(p.health_notes)) keywords.push('back');
    const safetyText = keywords.length
      ? `Sessions adapted for your ${keywords.join(', ')} conditions. Stop if you feel sharp pain or tingling.`
      : 'Sessions adapted for your health conditions. Stop if you feel sharp pain.';
    document.getElementById('safety-text').textContent = safetyText;
  }

  // Streak
  const sessions = await getSessionLogs(currentUser.id, 50);
  const streak = calculateStreak(sessions);
  document.getElementById('streak-num').textContent = streak;

  // Slot time
  const timeMap = { '6am': '6:00 AM', '9am': '9:00 AM', lunch: '12:00 PM', evening: '7:00 PM' };
  const durMap = { '10': '10–15 min', '20': '20–30 min', '45': '30–45 min', '60': '45–60 min' };
  document.getElementById('main-slot-time').textContent = timeMap[p.default_time] || '6:00 AM';
  document.getElementById('main-slot-dur').textContent = durMap[p.duration] || '20–30 min';

  // Check if today already done
  const todaySessions = sessions.filter(s => {
    const d = new Date(s.created_at);
    const today = new Date();
    return d.toDateString() === today.toDateString() && s.completed;
  });
  document.getElementById('main-slot-status').textContent = todaySessions.length ? 'Done ✓' : 'Upcoming';

  // Week strip
  renderWeekStrip(sessions);
}

function renderWeekStrip(sessions) {
  const strip = document.getElementById('week-strip');
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);
  strip.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dStr = d.toDateString();
    const todayStr = now.toDateString();
    const done = sessions.some(s => new Date(s.created_at).toDateString() === dStr && s.completed);
    const isToday = dStr === todayStr;
    const isPast = d < now && !isToday;
    let cls = 'week-day';
    if (isToday) cls += ' today';
    else if (done) cls += ' done';
    else if (isPast) cls += ' missed';
    strip.innerHTML += `<div class="${cls}"><div class="wd-name">${days[i]}</div><div class="wd-dot"></div></div>`;
  }
}

function startSession() {
  switchView('chat');
  setTimeout(() => {
    const p = currentProfile;
    const msg = p?.health_notes
      ? `Start my session. My health conditions: ${p.health_notes}. My goal is ${p.goal}. Session length: ${p.duration} minutes. Guide me through a safe, adapted workout.`
      : `Start my ${p?.duration || '20'}-minute session. My goal is ${p?.goal || 'flexibility'}. Guide me through it step by step.`;
    sendMessage(msg, false);
  }, 300);
}

function reschedule() {
  switchView('chat');
  setTimeout(() => {
    sendMessage("I can't make my scheduled workout right now. What other times could work today? Give me 3 options that fit different parts of my day.", false);
  }, 300);
}

function quickChat(msg) {
  switchView('chat');
  setTimeout(() => sendMessage(msg, false), 300);
}

// ─── Session View ───
async function renderSession() {
  const p = currentProfile;
  if (!p) return;

  const durMap = { '10': '10–15', '20': '20–30', '45': '30–45', '60': '45–60' };
  document.getElementById('session-meta').textContent =
    `${durMap[p.duration] || '20–30'} min • Curated for your profile`;

  // Use the local exercise library — zero tokens, instant
  const exercises = getExercisesForProfile(p);
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  const cards = renderLibraryCards(exercises);
  if (cards) list.appendChild(cards);
}


// ─── Check-in View ───
const bodyAreas = [
  { id: 'upper-back', label: 'Upper back', emoji: '🔙' },
  { id: 'spine', label: 'Spine / nerve', emoji: '⚡' },
  { id: 'knee', label: 'Knee', emoji: '🦵' },
  { id: 'neck', label: 'Neck / shoulders', emoji: '🦒' },
  { id: 'hips', label: 'Hips', emoji: '🔄' },
  { id: 'energy', label: 'Energy level', emoji: '⚡' }
];
const areaState = {};
const areaOrder = ['neutral', 'ok', 'pain'];
let sessionCompleted = null;
let selectedFeeling = null;

async function renderCheckin() {
  const grid = document.getElementById('body-grid');
  grid.innerHTML = bodyAreas.map(a => `
    <button class="body-area-btn" id="area-${a.id}" onclick="cycleBodyArea('${a.id}')">
      <span>${a.emoji}</span>
      <span>${a.label}</span>
      <span class="body-area-status" id="status-${a.id}">—</span>
    </button>
  `).join('');
  // Reset
  bodyAreas.forEach(a => { areaState[a.id] = 'neutral'; });
  sessionCompleted = null;
  selectedFeeling = null;
  document.querySelectorAll('.feel-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.completed-btn').forEach(b => { b.classList.remove('yes', 'no'); });
  document.getElementById('checkin-notes').value = '';
  // Recent
  const recent = await getRecentCheckins(currentUser.id, 3);
  renderRecentCheckins(recent);
}

function cycleBodyArea(id) {
  const states = ['neutral', 'ok', 'pain'];
  const cur = areaState[id] || 'neutral';
  const next = states[(states.indexOf(cur) + 1) % states.length];
  areaState[id] = next;
  const btn = document.getElementById(`area-${id}`);
  btn.className = `body-area-btn ${next}`;
  const labels = { neutral: '—', ok: 'Good ✓', pain: 'Aching' };
  document.getElementById(`status-${id}`).textContent = labels[next];
}

function setFeeling(el, val) {
  selectedFeeling = val;
  document.querySelectorAll('.feel-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function setCompleted(val) {
  sessionCompleted = val;
  document.getElementById('comp-yes').className = 'completed-btn' + (val ? ' yes' : '');
  document.getElementById('comp-no').className = 'completed-btn' + (!val ? ' no' : '');
}

async function submitCheckin() {
  const notes = document.getElementById('checkin-notes').value.trim();
  if (!selectedFeeling) { showToast('Please select how you feel today'); return; }
  showLoading(true);
  try {
    const checkin = {
      feeling: selectedFeeling,
      body_areas: { ...areaState },
      completed: sessionCompleted,
      notes
    };
    await saveCheckin(currentUser.id, checkin);
    if (sessionCompleted) {
      await logSession(currentUser.id, {
        title: 'Daily session',
        duration_minutes: parseInt(currentProfile?.duration) || 20,
        completed: true,
        notes
      });
    }
    showToast('Check-in saved!');
    // Send to AI for feedback
    const bodyStr = Object.entries(areaState)
      .filter(([, v]) => v !== 'neutral')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const msg = `My check-in: Feeling ${selectedFeeling}. ${bodyStr ? 'Body: ' + bodyStr + '.' : ''} Session ${sessionCompleted ? 'completed' : 'not done'} today. ${notes ? 'Notes: ' + notes : ''} Give me brief feedback and any suggestions based on this.`;
    switchView('chat');
    setTimeout(() => sendMessage(msg, false), 300);
  } catch (e) {
    showToast('Error saving check-in. Try again.');
  }
  showLoading(false);
}

function renderRecentCheckins(checkins) {
  const el = document.getElementById('recent-checkins');
  if (!checkins.length) { el.innerHTML = '<div style="color:#666;font-size:14px;padding:0.5rem 0">No check-ins yet.</div>'; return; }
  el.innerHTML = checkins.map(c => {
    const date = new Date(c.created_at).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const areas = c.body_areas ? Object.entries(c.body_areas).filter(([, v]) => v !== 'neutral') : [];
    const tags = areas.map(([k, v]) => `<span class="tag ${v === 'ok' ? 'good' : 'bad'}">${k}: ${v}</span>`).join('');
    return `
      <div class="checkin-item">
        <div class="ci-date">${date} · Feeling: ${c.feeling || '—'} · Session: ${c.completed ? 'Done ✓' : 'Skipped'}</div>
        <div class="ci-body">${c.notes || 'No notes added.'}</div>
        ${tags ? `<div class="ci-tags">${tags}</div>` : ''}
      </div>
    `;
  }).join('');
}

// ─── Progress View ───
async function renderProgress() {
  const sessions = await getSessionLogs(currentUser.id, 50);
  const checkins = await getRecentCheckins(currentUser.id, 30);
  const streak = calculateStreak(sessions);
  const completed = sessions.filter(s => s.completed);
  const thisWeek = completed.filter(s => {
    const d = new Date(s.created_at);
    const now = new Date();
    return (now - d) < 7 * 86400000;
  }).length;

  document.getElementById('stat-streak').textContent = streak;
  document.getElementById('stat-total').textContent = completed.length;
  document.getElementById('stat-week').textContent = `${thisWeek}/7`;
  document.getElementById('stat-best').textContent = streak; // simplified

  // Body trends from checkins
  const trends = document.getElementById('body-trends');
  if (checkins.length < 2) {
    trends.innerHTML = '<div style="color:#666;font-size:14px">Not enough check-ins yet for trends.</div>';
  } else {
    const areas = ['upper-back', 'spine', 'knee', 'neck'];
    trends.innerHTML = areas.map(area => {
      const recent = checkins.slice(0, 5).filter(c => c.body_areas?.[area]);
      if (!recent.length) return '';
      const painCount = recent.filter(c => c.body_areas[area] === 'pain').length;
      const okCount = recent.filter(c => c.body_areas[area] === 'ok').length;
      let trend = 'No data';
      let cls = '';
      if (okCount > painCount) { trend = 'Improving'; cls = 'improving'; }
      else if (painCount > okCount) { trend = 'Needs attention'; cls = 'worsening'; }
      else { trend = 'Stable'; cls = 'stable'; }
      return `<div class="trend-item"><span class="trend-label">${area.replace('-', ' ')}</span><span class="trend-val ${cls}">${trend}</span></div>`;
    }).join('');
  }

  // History
  const hist = document.getElementById('session-history');
  hist.innerHTML = sessions.slice(0, 7).map(s => {
    const date = new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const badge = s.completed ? 'Completed' : 'Skipped';
    const cls = s.completed ? '' : 'missed';
    return `<div class="history-item">
      <span class="history-date">${date}</span>
      <span class="history-title">${s.title || 'Session'}</span>
      <span class="history-badge ${cls}">${badge}</span>
    </div>`;
  }).join('') || '<div style="color:#666;font-size:14px">No sessions logged yet.</div>';
}

// ─── Compete View ───
async function renderCompete() {
  const data = await getLeaderboardData();
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = data.map((user, i) => {
    const initial = (user.name || 'U')[0].toUpperCase();
    return `
      <div class="lb-item">
        <div class="lb-rank ${i === 0 ? 'first' : ''}">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
        <div class="lb-avatar">${initial}</div>
        <div class="lb-info">
          <div class="lb-name">${user.name || 'User'} ${user.id === currentUser.id ? '(you)' : ''}</div>
          <div class="lb-detail">${user.totalSessions} total sessions · ${user.weekSessions} this week</div>
        </div>
        <div>
          <div class="lb-score">${user.streak}</div>
          <div class="lb-score-label">day streak</div>
        </div>
      </div>
    `;
  }).join('') || '<div style="color:#666;font-size:14px;padding:1rem 0">No data yet.</div>';

  // Challenge bar
  const myData = data.find(u => u.id === currentUser.id);
  const myWeek = myData?.weekSessions || 0;
  document.getElementById('challenge-progress').innerHTML = `
    <div class="challenge-bar-wrap">
      <div class="challenge-bar" style="width:${Math.min(100, (myWeek / 5) * 100)}%"></div>
    </div>
    <div style="font-size:12px;color:#666;margin-top:6px">${myWeek} / 5 sessions this week</div>
  `;
}

// ─── Resources View ───
async function loadResources() {
  const el = document.getElementById('resources-list');
  el.innerHTML = '<div class="loading-resources">Finding personalized resources...</div>';
  const p = currentProfile;
  const prompt = `Suggest 5 free YouTube videos or online guides specifically for someone with these conditions: ${p?.health_notes || 'general fitness'}. Their goal is ${p?.goal || 'flexibility'}. For each resource give: title, channel/source, why it helps. Keep it concise. Format as a simple list.`;
  try {
    const response = await callClaude([{ role: 'user', content: prompt }], 'You are a fitness resource curator. Suggest only real, well-known free YouTube channels and resources.');
    el.innerHTML = `<div class="resource-item"><div class="resource-thumb">📚</div><div><div class="resource-title">AI-curated resources</div><div class="resource-meta" style="white-space:pre-wrap;margin-top:4px">${response}</div></div></div>`;
  } catch (e) {
    el.innerHTML = '<div class="loading-resources">Could not load resources. Check your connection.</div>';
  }
}

// ─── Profile View ───
function renderProfile() {
  const p = currentProfile;
  if (!p) return;
  document.getElementById('profile-avatar').textContent = (p.name || 'U')[0].toUpperCase();
  document.getElementById('profile-name-display').textContent = p.name || '—';
  document.getElementById('profile-email-display').textContent = currentUser.email || '';
  const goalMap = { flexibility: 'Flexibility & mobility', strength: 'Strength & muscle', weight_loss: 'Weight loss & cardio', recovery: 'Recovery & pain relief' };
  const timeMap = { '6am': 'Early morning (6–8 AM)', '9am': 'Mid morning (8–10 AM)', lunch: 'Lunch break (12–2 PM)', evening: 'Evening (6–9 PM)' };
  const durMap = { '10': '10–15 min', '20': '20–30 min', '45': '30–45 min', '60': '45–60 min' };
  document.getElementById('profile-card').innerHTML = `
    <div class="profile-row"><span class="profile-row-label">Health notes</span><span>${p.health_notes || 'None'}</span></div>
  `;
  document.getElementById('pref-goal').textContent = goalMap[p.goal] || p.goal || '—';
  document.getElementById('pref-time').textContent = timeMap[p.default_time] || '—';
  document.getElementById('pref-dur').textContent = durMap[p.duration] || '—';
}

function editProfile() {
  quickChat('I want to update my fitness profile. Ask me what I want to change — my goal, workout time, session length, or health notes.');
}

// ─── Admin View ───
async function renderAdmin() {
  if (!currentProfile?.is_admin) {
    document.getElementById('view-admin').innerHTML = '<div class="view-inner" style="color:#666;padding-top:2rem">Access denied.</div>';
    return;
  }
  const users = await getAllProfiles();
  const el = document.getElementById('admin-users');
  el.innerHTML = users.map(u => `
    <div class="admin-user-card">
      <div class="user-avatar">${(u.name || 'U')[0].toUpperCase()}</div>
      <div class="admin-user-info">
        <div class="admin-user-name">${u.name || 'Unnamed'} ${u.is_admin ? '· Admin' : ''}</div>
        <div class="admin-user-meta">Goal: ${u.goal || '—'} · Onboarded: ${u.onboarded ? 'Yes' : 'No'}</div>
        <div class="admin-user-meta" style="margin-top:2px;font-size:11px;color:#555">${u.health_notes ? 'Conditions: ' + u.health_notes.substring(0, 80) + (u.health_notes.length > 80 ? '...' : '') : 'No health notes'}</div>
      </div>
    </div>
  `).join('') || '<div style="color:#666">No users found.</div>';
}

function changeAppPassword() {
  const newPw = prompt('Enter new app unlock password:');
  if (newPw && newPw.length >= 6) {
    localStorage.setItem('fp_app_password', newPw);
    showToast('App password updated');
  } else if (newPw) {
    showToast('Password must be at least 6 characters');
  }
}

function clearLocalData() {
  if (confirm('Clear all local app data? This will sign you out.')) {
    localStorage.clear();
    location.reload();
  }
}

async function checkSupabaseConnection() {
  try {
    const sb = await initSupabase();
    const { error } = await sb.from('profiles').select('id').limit(1);
    const el = document.getElementById('supabase-indicator');
    const sub = document.getElementById('supabase-status');
    if (el) el.textContent = error ? 'Error ✗' : 'Connected ✓';
    if (sub) sub.textContent = error ? error.message : 'Database connected and healthy';
  } catch (e) { /* silently ignore on non-admin views */ }
}

function sendSuggestion(text) {
  document.getElementById('chat-suggestions').style.display = 'none';
  sendMessage(text, false);
}

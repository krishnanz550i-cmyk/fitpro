let currentUser = null;
let currentProfile = null;

function unlockApp() {
  const input = document.getElementById('lock-password').value;
  const err = document.getElementById('lock-error');
  const stored = localStorage.getItem('fp_app_password') || CONFIG.APP_PASSWORD;
  if (input === stored) {
    localStorage.setItem('fp_unlocked', '1');
    showScreen('auth-screen');
    err.textContent = '';
  } else {
    err.textContent = 'Incorrect password. Please try again.';
    document.getElementById('lock-password').value = '';
  }
}

document.getElementById('lock-password').addEventListener('keydown', e => {
  if (e.key === 'Enter') unlockApp();
});

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`.auth-tab[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
  document.getElementById(`auth-${tab}`).classList.add('active');
}

async function signupUser() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const err = document.getElementById('signup-error');
  err.textContent = '';
  if (!name || !email || !password) { err.textContent = 'Please fill in all fields.'; return; }
  if (password.length < 8) { err.textContent = 'Password must be at least 8 characters.'; return; }
  showLoading(true);
  try {
    const sb = initSupabase();
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) throw error;
    const userId = data.user.id;
    const isAdmin = email.toLowerCase() === CONFIG.ADMIN_EMAIL.toLowerCase();
    await upsertProfile(userId, { name, is_admin: isAdmin, onboarded: false });
    currentUser = data.user;
    currentProfile = { name, is_admin: isAdmin, onboarded: false };
    showScreen('onboarding-screen');
  } catch (e) {
    err.textContent = e.message || 'Signup failed. Please try again.';
  }
  showLoading(false);
}

async function loginUser() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const err = document.getElementById('login-error');
  err.textContent = '';
  if (!email || !password) { err.textContent = 'Please enter email and password.'; return; }
  showLoading(true);
  try {
    const sb = initSupabase();
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    currentUser = data.user;
    currentProfile = await getProfile(currentUser.id);
    if (!currentProfile) {
      const isAdmin = email.toLowerCase() === CONFIG.ADMIN_EMAIL.toLowerCase();
      await upsertProfile(currentUser.id, { name: email.split('@')[0], is_admin: isAdmin, onboarded: false });
      currentProfile = await getProfile(currentUser.id);
    }
    if (!currentProfile.onboarded) {
      showScreen('onboarding-screen');
    } else {
      await launchApp();
    }
  } catch (e) {
    err.textContent = e.message || 'Login failed. Please check your credentials.';
  }
  showLoading(false);
}

async function logoutUser() {
  showLoading(true);
  const sb = initSupabase();
  await sb.auth.signOut();
  currentUser = null;
  currentProfile = null;
  chatHistory = [];
  localStorage.removeItem('fp_unlocked');
  showScreen('lock-screen');
  showLoading(false);
}

async function tryRestoreSession() {
  showLoading(true);
  const unlocked = localStorage.getItem('fp_unlocked');
  if (!unlocked) { showScreen('lock-screen'); showLoading(false); return; }
  try {
    const sb = initSupabase();
    const { data } = await sb.auth.getSession();
    if (data?.session?.user) {
      currentUser = data.session.user;
      currentProfile = await getProfile(currentUser.id);
      if (!currentProfile || !currentProfile.onboarded) {
        showScreen('onboarding-screen');
      } else {
        await launchApp();
      }
    } else {
      showScreen('auth-screen');
    }
  } catch (e) {
    showScreen('auth-screen');
  }
  showLoading(false);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showLoading(show) {
  document.getElementById('loading-overlay').style.display = show ? 'flex' : 'none';
}

function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

window.addEventListener('load', tryRestoreSession);

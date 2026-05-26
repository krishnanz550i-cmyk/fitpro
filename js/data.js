// ─── Utility functions used across the app ───

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit'
  });
}

function daysBetween(d1, d2) {
  return Math.round(Math.abs(new Date(d1) - new Date(d2)) / 86400000);
}

function isToday(dateStr) {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

// ─── Body area helpers ───
function getBodyStatusColor(status) {
  if (status === 'ok') return '#6abf6a';
  if (status === 'pain') return '#bf6a6a';
  return '#666';
}

// ─── Session plan text generator for sharing ───
function generateSessionSummary(profile) {
  const exercises = getExercisePlan(profile);
  return exercises.map((ex, i) => `${i + 1}. ${ex.name}\n   ${ex.detail}${ex.note ? '\n   ⚠ ' + ex.note : ''}`).join('\n\n');
}

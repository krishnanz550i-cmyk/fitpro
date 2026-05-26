// ─── Exercise Illustration Library ───
// Lightweight inline SVG stick figures. No external requests. Zero tokens.

const EXERCISE_SVG = {

  // ── Breathing / core ──
  breathing: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="21" x2="40" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="26" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="54" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="32" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="48" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M28 48 Q40 36 52 48" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.7"/>
  </svg>`,

  // ── Cat-cow ──
  'cat-cow': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="38" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <path d="M21 38 Q40 28 59 38" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="59" y1="38" x2="68" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="27" y1="33" x2="27" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="27" y1="52" x2="22" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="27" y1="52" x2="32" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="50" y1="33" x2="50" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="52" x2="45" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="50" y1="52" x2="55" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M25 26 Q40 18 55 26" fill="none" stroke="#c9a84c" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.7"/>
  </svg>`,

  // ── Supine knee-to-chest ──
  'knee-to-chest': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="65" cy="35" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="58" y1="35" x2="30" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="44" y1="38" x2="44" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M30 42 Q20 50 22 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 60 Q26 55 35 52 Q40 50 44 42" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="30" y1="42" x2="16" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="44" x2="12" y2="50" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="30" y1="42" x2="14" y2="48" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
  </svg>`,

  // ── Thoracic rotation ──
  'thoracic-rotation': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="21" x2="40" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="30" x2="18" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="30" x2="62" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="33" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="47" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 18 Q30 10 42 16" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2" marker-end="url(#arr)" opacity="0.8"/>
  </svg>`,

  // ── Chest opener / doorframe ──
  'chest-opener': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="6" height="60" rx="2" fill="none" stroke="#555" stroke-width="1.5"/>
    <rect x="66" y="10" width="6" height="60" rx="2" fill="none" stroke="#555" stroke-width="1.5"/>
    <circle cx="40" cy="20" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="27" x2="40" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="36" x2="14" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="36" x2="66" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="52" x2="33" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="52" x2="47" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── Legs up the wall ──
  'legs-up-wall': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="68" y="8" width="6" height="64" rx="2" fill="none" stroke="#555" stroke-width="1.5"/>
    <circle cx="18" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="18" y1="57" x2="18" y2="66" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="8" y1="57" x2="40" y2="57" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
    <line x1="25" y1="50" x2="54" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="54" y1="26" x2="68" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="25" y1="50" x2="52" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="52" y1="32" x2="68" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="18" y1="57" x2="6" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Child's pose ──
  'childs-pose': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="66" cy="38" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <path d="M60 42 Q50 52 38 56 Q28 58 16 56" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="50" x2="44" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="44" y1="64" x2="36" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="44" y1="64" x2="42" y2="70" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="60" y1="42" x2="48" y2="34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="34" x2="18" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="18" y1="30" x2="12" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Neck rolls ──
  'neck-rolls': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="30" x2="40" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="42" x2="22" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="42" x2="58" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="42" x2="33" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="42" x2="47" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M30 12 Q40 4 50 12" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.8"/>
    <path d="M50 28 Q40 36 30 28" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.8"/>
  </svg>`,

  // ── Squat ──
  'squat': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="19" x2="40" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="28" x2="22" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="28" x2="58" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 40 Q32 50 28 62" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 40 Q48 50 52 62" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="22" y1="62" x2="34" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="46" y1="62" x2="58" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Wall sit ──
  'wall-sit': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="68" y="8" width="6" height="64" rx="2" fill="none" stroke="#555" stroke-width="1.5"/>
    <circle cx="52" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="52" y1="23" x2="58" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="52" y1="32" x2="34" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="52" y1="32" x2="68" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
    <line x1="58" y1="44" x2="44" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="44" y1="44" x2="38" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="58" y1="44" x2="64" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── Plank ──
  'plank': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="66" cy="30" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="60" y1="34" x2="18" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="38" x2="44" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="44" y1="54" x2="38" y2="54" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="28" y1="40" x2="24" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="56" x2="18" y2="56" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="60" y1="34" x2="56" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="56" y1="48" x2="48" y2="48" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Bridge ──
  'bridge': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="62" cy="36" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="55" y1="38" x2="18" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="18" y1="44" x2="14" y2="60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 40 Q28 30 28 52" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="28" y1="52" x2="22" y2="60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M48 38 Q46 28 48 52" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="52" x2="44" y2="60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="60" x2="52" y2="60" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  // ── Hip flexor stretch ──
  'hip-flexor': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="19" x2="40" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="28" x2="24" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="28" x2="56" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 38 Q34 46 28 62" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 38 Q52 44 54 62" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="22" y1="62" x2="34" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Default / generic ──
  default: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="21" x2="40" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="24" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="56" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="48" x2="32" y2="66" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="48" x2="48" y2="66" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`
};

// ─── Match an exercise name to an SVG illustration ───
function getExerciseSVG(exerciseName) {
  const name = (exerciseName || '').toLowerCase();
  if (/breath|diaphragm/.test(name))         return EXERCISE_SVG.breathing;
  if (/cat|cow/.test(name))                  return EXERCISE_SVG['cat-cow'];
  if (/knee.?to.?chest|supine knee/.test(name)) return EXERCISE_SVG['knee-to-chest'];
  if (/thoracic|rotation/.test(name))        return EXERCISE_SVG['thoracic-rotation'];
  if (/chest.?open|doorframe|pec/.test(name)) return EXERCISE_SVG['chest-opener'];
  if (/legs.?up|wall.?hamstring/.test(name)) return EXERCISE_SVG['legs-up-wall'];
  if (/child|childs/.test(name))             return EXERCISE_SVG['childs-pose'];
  if (/neck|cervical/.test(name))            return EXERCISE_SVG['neck-rolls'];
  if (/squat/.test(name))                    return EXERCISE_SVG.squat;
  if (/wall.?sit/.test(name))                return EXERCISE_SVG['wall-sit'];
  if (/plank/.test(name))                    return EXERCISE_SVG.plank;
  if (/bridge|glute/.test(name))             return EXERCISE_SVG.bridge;
  if (/hip.?flex|lunge/.test(name))          return EXERCISE_SVG['hip-flexor'];
  return EXERCISE_SVG.default;
}

// ─── Parse a Claude exercise response into structured cards ───
// Looks for patterns like: "1. Exercise Name\n   detail\n   note"
function parseExerciseResponse(text) {
  const lines = text.split('\n');
  const exercises = [];
  let current = null;

  for (const raw of lines) {
    const line = raw.trim();
    // Match "1." or "1)" at start of line
    const numMatch = line.match(/^(\d+)[.)]\s+(.+)/);
    if (numMatch) {
      if (current) exercises.push(current);
      current = { name: numMatch[2].replace(/\*+/g, '').trim(), details: [], note: null };
    } else if (current) {
      // Safety/note lines (⚠, !, note:)
      if (/[⚠!]|note:|stop if|avoid|caution/i.test(line) && line.length > 3) {
        current.note = line.replace(/[⚠!*]/g, '').trim();
      } else if (line.length > 3 && !line.startsWith('#')) {
        current.details.push(line.replace(/\*+/g, '').trim());
      }
    }
  }
  if (current) exercises.push(current);
  return exercises;
}

// ─── Render a parsed exercise list as visual cards ───
function renderExerciseCards(exercises) {
  if (!exercises || exercises.length === 0) return null;
  const wrap = document.createElement('div');
  wrap.className = 'ex-card-list';
  exercises.forEach((ex, i) => {
    const card = document.createElement('div');
    card.className = 'ex-card';
    card.innerHTML = `
      <div class="ex-card-num">${i + 1}</div>
      <div class="ex-card-art" aria-hidden="true">${getExerciseSVG(ex.name)}</div>
      <div class="ex-card-body">
        <div class="ex-card-title">${escapeHtml(ex.name)}</div>
        ${ex.details.length ? `<div class="ex-card-detail">${escapeHtml(ex.details.slice(0, 2).join(' · '))}</div>` : ''}
        ${ex.note ? `<div class="ex-card-note">⚠ ${escapeHtml(ex.note)}</div>` : ''}
      </div>
    `;
    wrap.appendChild(card);
  });
  return wrap;
}

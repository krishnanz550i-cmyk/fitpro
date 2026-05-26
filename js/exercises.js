// ─── Exercise Illustration Library ───
// Position-accurate SVG illustrations showing body position + movement direction

const EXERCISE_SVG = {

  // ── Seated upright (breathing, shoulder rolls, side stretch, neck) ──
  seated: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <!-- chair -->
    <rect x="18" y="50" width="44" height="3" rx="1.5" fill="none" stroke="#444" stroke-width="1.5"/>
    <line x1="20" y1="53" x2="20" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="53" x2="60" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <!-- person seated -->
    <circle cx="40" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="23" x2="40" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arms resting on thighs -->
    <line x1="40" y1="32" x2="26" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="54" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- legs bent at 90° -->
    <line x1="40" y1="46" x2="32" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="50" x2="32" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="48" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="50" x2="48" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── Neck rolls — seated, head tilted with arc ──
  'neck-rolls': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="50" width="44" height="3" rx="1.5" fill="none" stroke="#444" stroke-width="1.5"/>
    <line x1="20" y1="53" x2="20" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="53" x2="60" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <!-- body -->
    <line x1="40" y1="27" x2="40" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="34" x2="26" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="34" x2="54" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="32" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="50" x2="32" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="48" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="50" x2="48" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- head tilted right -->
    <circle cx="44" cy="18" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="23" x2="40" y2="27" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- rotation arc -->
    <path d="M28 12 Q40 4 52 12" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <path d="M52 12 Q56 16 52 20" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  // ── Shoulder rolls — seated, shoulder arc shown ──
  'shoulder-rolls': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="50" width="44" height="3" rx="1.5" fill="none" stroke="#444" stroke-width="1.5"/>
    <line x1="20" y1="53" x2="20" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="53" x2="60" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="40" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="23" x2="40" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="32" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="50" x2="32" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="48" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="50" x2="48" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arms raised slightly with circular arrow -->
    <line x1="40" y1="32" x2="22" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="58" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- circular motion arrows at shoulders -->
    <path d="M16 24 Q12 32 18 38" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <path d="M18 38 Q22 40 24 36" fill="none" stroke="#4a9a4a" stroke-width="1.5"/>
    <path d="M64 24 Q68 32 62 38" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <path d="M62 38 Q58 40 56 36" fill="none" stroke="#4a9a4a" stroke-width="1.5"/>
  </svg>`,

  // ── Seated side stretch — arm overhead, torso leaning ──
  'side-stretch': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="50" width="44" height="3" rx="1.5" fill="none" stroke="#444" stroke-width="1.5"/>
    <line x1="20" y1="53" x2="20" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="53" x2="60" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <!-- tilted torso -->
    <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="21" x2="38" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- right arm up and over -->
    <line x1="38" y1="32" x2="56" y2="24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="56" y1="24" x2="62" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- left arm on chair -->
    <line x1="38" y1="32" x2="24" y2="46" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- legs -->
    <line x1="38" y1="46" x2="30" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="30" y1="50" x2="30" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="46" x2="46" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="46" y1="50" x2="46" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arc showing stretch direction -->
    <path d="M46 8 Q56 4 62 10" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  // ── Breathing — seated, hands on belly/chest ──
  breathing: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="50" width="44" height="3" rx="1.5" fill="none" stroke="#444" stroke-width="1.5"/>
    <line x1="20" y1="53" x2="20" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="53" x2="60" y2="68" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="40" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="23" x2="40" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- hands resting on chest/belly -->
    <line x1="40" y1="30" x2="28" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="30" x2="52" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="27" cy="37" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="53" cy="37" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <line x1="40" y1="46" x2="32" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="50" x2="32" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="46" x2="48" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="50" x2="48" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- breath arrows -->
    <path d="M34 26 Q28 22 26 14" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <path d="M46 26 Q52 22 54 14" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  // ── Cat-cow — on all fours, spine arched up ──
  'cat-cow': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <!-- floor line -->
    <line x1="6" y1="68" x2="74" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- head -->
    <circle cx="66" cy="34" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <!-- arched spine (cat) -->
    <path d="M60 36 Q50 20 30 24 Q18 26 14 34" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- tail up -->
    <path d="M14 34 Q8 28 10 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- front arms vertical -->
    <line x1="58" y1="40" x2="58" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="46" y1="38" x2="46" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- back legs -->
    <line x1="22" y1="30" x2="22" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="14" y1="34" x2="14" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arch direction arrow -->
    <path d="M36 18 Q40 12 44 18" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="44,18 46,14 48,20" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Knee-to-chest — lying on back, one knee pulled up ──
  'knee-to-chest': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="68" x2="74" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- body lying flat -->
    <circle cx="68" cy="52" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="62" y1="54" x2="20" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- bent knee pulled to chest -->
    <path d="M48 54 Q44 42 36 40 Q30 40 28 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- hands holding knee -->
    <circle cx="34" cy="44" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <!-- straight leg on floor -->
    <line x1="20" y1="58" x2="8" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arm -->
    <line x1="55" y1="52" x2="38" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- arrow pulling knee toward chest -->
    <path d="M28 48 Q24 44 28 40" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="28,40 24,38 30,36" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Thoracic rotation — lying on back, knees dropped to side ──
  'thoracic-rotation': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="68" x2="74" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- body lying -->
    <circle cx="68" cy="44" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="62" y1="46" x2="20" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arms outstretched in T -->
    <line x1="46" y1="44" x2="46" y2="30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="46" y1="44" x2="46" y2="58" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <!-- knees bent and dropped LEFT -->
    <path d="M32 46 Q28 52 18 56 Q14 58 12 62" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M28 48 Q24 54 16 58 Q12 60 10 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- rotation arrow -->
    <path d="M52 36 Q58 32 62 38" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="62,38 66,36 64,42" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Chest opener — standing in doorframe, arms at 90° ──
  'chest-opener': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <!-- doorframe posts -->
    <rect x="4" y="8" width="7" height="64" rx="2" fill="none" stroke="#444" stroke-width="1.5"/>
    <rect x="69" y="8" width="7" height="64" rx="2" fill="none" stroke="#444" stroke-width="1.5"/>
    <circle cx="40" cy="18" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="25" x2="40" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arms up at 90° pressing on frame -->
    <line x1="40" y1="33" x2="11" y2="33" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="11" y1="33" x2="11" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="33" x2="69" y2="33" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="69" y1="33" x2="69" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- hands on frame -->
    <circle cx="11" cy="19" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="69" cy="19" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <line x1="40" y1="52" x2="33" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="52" x2="47" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- chest opening arrow -->
    <path d="M30 28 Q40 22 50 28" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  // ── Legs up the wall — lying on back, legs vertical against wall ──
  'legs-up-wall': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <!-- wall on right -->
    <rect x="70" y="4" width="6" height="72" rx="2" fill="none" stroke="#444" stroke-width="1.5"/>
    <!-- floor -->
    <line x1="4" y1="68" x2="74" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- body lying, hips near wall -->
    <circle cx="14" cy="54" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="20" y1="56" x2="52" y2="60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- hips at wall base -->
    <line x1="52" y1="60" x2="56" y2="64" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <!-- legs up vertical against wall -->
    <line x1="55" y1="62" x2="62" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="62" y1="18" x2="70" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="52" y1="60" x2="60" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="60" y1="14" x2="70" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- arms at sides -->
    <line x1="28" y1="56" x2="28" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Child's pose — kneeling, torso folded forward, arms extended ──
  'childs-pose': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="68" x2="76" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- head on floor -->
    <circle cx="12" cy="56" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <!-- arms stretched forward on floor -->
    <line x1="18" y1="54" x2="44" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="44" y1="50" x2="56" y2="50" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <!-- second arm -->
    <line x1="18" y1="58" x2="44" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- torso folded / hips up -->
    <path d="M18 56 Q32 58 46 52 Q54 48 58 44" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- knees on floor, hips at heels -->
    <line x1="58" y1="44" x2="62" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="62" y1="56" x2="68" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="55" y1="46" x2="60" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="60" y1="58" x2="66" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- breath arrow upward at back -->
    <path d="M36 44 Q38 36 42 38" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  // ── Supine spinal twist — lying, both knees dropped to one side ──
  'spinal-twist': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="68" x2="76" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- body lying on back -->
    <circle cx="68" cy="46" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="62" y1="48" x2="24" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- T arms outstretched -->
    <line x1="44" y1="46" x2="44" y2="34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="44" y1="46" x2="44" y2="58" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
    <!-- both knees bent and dropped to LEFT side -->
    <path d="M38 48 Q32 54 22 58" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="22" y1="58" x2="16" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 50 Q26 56 18 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="18" y1="60" x2="12" y2="66" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- twist arrow -->
    <path d="M50 38 Q56 32 62 38" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="62,38 66,35 65,42" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Ankle pumps — seated, foot flexed/pointed ──
  'ankle-pumps': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="44" width="44" height="3" rx="1.5" fill="none" stroke="#444" stroke-width="1.5"/>
    <line x1="12" y1="47" x2="12" y2="62" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="52" y1="47" x2="52" y2="62" stroke="#444" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="32" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="32" y1="19" x2="32" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="32" y1="28" x2="18" y2="38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="32" y1="28" x2="46" y2="38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- right leg extended forward -->
    <line x1="32" y1="40" x2="24" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="44" x2="24" y2="60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- left leg extended straight out -->
    <line x1="32" y1="40" x2="40" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="44" x2="58" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- foot flex + arc showing pump motion -->
    <path d="M58 50 Q64 46 66 52" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M60 46 Q68 40 70 48" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <path d="M60 56 Q68 58 70 52" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  // ── Bridge — lying on back, hips lifted ──
  bridge: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="68" x2="76" y2="68" stroke="#333" stroke-width="1.5"/>
    <circle cx="68" cy="48" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="62" y1="50" x2="46" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- hips lifted into bridge -->
    <path d="M46 52 Q38 36 28 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- feet flat on floor -->
    <line x1="28" y1="48" x2="20" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="50" x2="28" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="16" y1="64" x2="26" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="64" x2="34" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- arms flat on floor -->
    <line x1="52" y1="54" x2="52" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- up arrow for hips -->
    <path d="M40 40 L40 30" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="40,28 37,34 43,34" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Plank — on forearms, body straight ──
  plank: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="68" x2="76" y2="68" stroke="#333" stroke-width="1.5"/>
    <circle cx="66" cy="36" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <!-- straight body line -->
    <line x1="60" y1="40" x2="16" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- forearms on floor -->
    <line x1="52" y1="42" x2="48" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="54" x2="36" y2="54" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="44" x2="36" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="56" x2="24" y2="56" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- toes on floor -->
    <line x1="16" y1="50" x2="10" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="8" y1="62" x2="16" y2="62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ── Hip flexor stretch — low lunge ──
  'hip-flexor': `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="68" x2="76" y2="68" stroke="#333" stroke-width="1.5"/>
    <!-- upright torso -->
    <circle cx="44" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="44" y1="21" x2="42" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arms raised slightly for balance -->
    <line x1="42" y1="30" x2="26" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="42" y1="30" x2="58" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- front knee bent 90° -->
    <line x1="42" y1="44" x2="52" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="52" y1="56" x2="60" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="56" y1="64" x2="68" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- back knee on floor -->
    <line x1="42" y1="44" x2="28" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="28" y1="52" x2="18" y2="64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="14" y1="64" x2="24" y2="64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- hip forward arrow -->
    <path d="M46 44 Q52 40 54 46" fill="none" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="54,46 58,44 56,50" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Squat — feet wide, knees bent, arms forward ──
  squat: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="72" x2="76" y2="72" stroke="#333" stroke-width="1.5"/>
    <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <!-- torso slightly forward -->
    <line x1="40" y1="21" x2="38" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- arms forward for balance -->
    <line x1="38" y1="32" x2="18" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="32" x2="58" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- thighs out wide -->
    <line x1="38" y1="44" x2="22" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="44" x2="54" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <!-- shins vertical, feet out -->
    <line x1="22" y1="52" x2="16" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="54" y1="52" x2="60" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="10" y1="68" x2="22" y2="68" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="54" y1="68" x2="66" y2="68" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <!-- down arrow -->
    <path d="M40 46 L40 52" stroke="#4a9a4a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <polygon points="40,54 37,50 43,50" fill="#4a9a4a" opacity="0.8"/>
  </svg>`,

  // ── Default — standing ──
  default: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="74" x2="76" y2="74" stroke="#333" stroke-width="1.5"/>
    <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="40" y1="21" x2="40" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="24" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="32" x2="56" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="50" x2="32" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="50" x2="48" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`
};

// ─── Match exercise name → SVG ───
function getExerciseSVG(exerciseName) {
  const n = (exerciseName || '').toLowerCase();
  if (/breath|diaphragm|spinal breath/.test(n))        return EXERCISE_SVG.breathing;
  if (/shoulder roll/.test(n))                          return EXERCISE_SVG['shoulder-rolls'];
  if (/neck roll|cervical/.test(n))                     return EXERCISE_SVG['neck-rolls'];
  if (/side stretch|lateral/.test(n))                   return EXERCISE_SVG['side-stretch'];
  if (/cat|cow/.test(n))                                return EXERCISE_SVG['cat-cow'];
  if (/knee.?to.?chest|supine knee/.test(n))            return EXERCISE_SVG['knee-to-chest'];
  if (/spinal twist|supine twist|rotation/.test(n))     return EXERCISE_SVG['spinal-twist'];
  if (/thoracic/.test(n))                               return EXERCISE_SVG['thoracic-rotation'];
  if (/chest.?open|doorframe|pec/.test(n))              return EXERCISE_SVG['chest-opener'];
  if (/legs.?up|wall.?hamstring/.test(n))               return EXERCISE_SVG['legs-up-wall'];
  if (/child|childs/.test(n))                           return EXERCISE_SVG['childs-pose'];
  if (/ankle pump|ankle circle/.test(n))                return EXERCISE_SVG['ankle-pumps'];
  if (/bridge|glute/.test(n))                           return EXERCISE_SVG.bridge;
  if (/plank/.test(n))                                  return EXERCISE_SVG.plank;
  if (/hip.?flex|lunge/.test(n))                        return EXERCISE_SVG['hip-flexor'];
  if (/squat/.test(n))                                  return EXERCISE_SVG.squat;
  // Fallback: seated for anything that sounds chair/desk-based
  if (/seated|sit|desk|chair/.test(n))                  return EXERCISE_SVG.seated;
  return EXERCISE_SVG.default;
}

// ─── Parse Claude's numbered list into structured objects ───
function parseExerciseResponse(text) {
  const lines = text.split('\n');
  const exercises = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.trim();
    const numMatch = line.match(/^(\d+)[.)]\s+(.+)/);
    if (numMatch) {
      if (current) exercises.push(current);
      current = { name: numMatch[2].replace(/\*+/g, '').trim(), details: [], note: null };
    } else if (current) {
      if (/[⚠!]|stop if|avoid|caution|never|no /i.test(line) && line.length > 4) {
        current.note = line.replace(/^[⚠!\s]+/, '').trim();
      } else if (line.length > 4 && !/^#{1,3}\s/.test(line)) {
        current.details.push(line.replace(/\*+/g, '').trim());
      }
    }
  }
  if (current) exercises.push(current);
  return exercises;
}

// ─── Render exercise objects → visual card DOM (async, supports dynamic SVG generation) ───
function renderExerciseCards(exercises) {
  if (!exercises || exercises.length === 0) return null;
  const wrap = document.createElement('div');
  wrap.className = 'ex-card-list';

  exercises.forEach((ex, i) => {
    const card = document.createElement('div');
    card.className = 'ex-card';

    // Placeholder SVG shown while generating (spinning dots)
    const placeholderSVG = `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="40" r="4" fill="#333"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="0s" repeatCount="indefinite"/></circle>
      <circle cx="40" cy="40" r="4" fill="#333"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="0.2s" repeatCount="indefinite"/></circle>
      <circle cx="48" cy="40" r="4" fill="#333"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="0.4s" repeatCount="indefinite"/></circle>
    </svg>`;

    card.innerHTML = `
      <div class="ex-card-num">${i + 1}</div>
      <div class="ex-card-art" id="ex-art-${i}" aria-hidden="true">${placeholderSVG}</div>
      <div class="ex-card-body">
        <div class="ex-card-title">${escapeHtml(ex.name)}</div>
        ${ex.details.length ? `<div class="ex-card-detail">${escapeHtml(ex.details.slice(0, 2).join(' · '))}</div>` : ''}
        ${ex.note ? `<div class="ex-card-note">⚠ ${escapeHtml(ex.note)}</div>` : ''}
      </div>
    `;
    wrap.appendChild(card);

    // Resolve SVG — instant for known exercises, async API call for new ones
    getExerciseSVGAsync(ex.name).then(svg => {
      const artEl = card.querySelector('.ex-card-art');
      if (artEl) artEl.innerHTML = svg;
    });
  });

  return wrap;
}

// ─── In-memory cache for this session (avoids duplicate DB reads) ───
const _svgCache = {};

// ─── Generate a new SVG via Claude API, save to shared Supabase table ───
async function generateExerciseSVG(exerciseName) {
  const prompt = `Generate an inline SVG stick figure illustration for the exercise: "${exerciseName}".

Rules:
- viewBox="0 0 80 80", no width/height attributes
- Use stroke="currentColor" for the figure (so it inherits CSS color)
- Use stroke="#444" for floor/wall/props
- Use stroke="#4a9a4a" with stroke-dasharray="3,2" for motion arrows
- stroke-width: 2.5 for body, 2 for limbs, 1.5 for props
- Show the correct body POSITION for this exercise (lying, seated, kneeling, standing, on all fours etc)
- Add at least one arrow or arc showing the direction of movement
- No text, no labels, no fill on the figure
- Include a floor line if the person is lying/kneeling: <line x1="4" y1="68" x2="76" y2="68" stroke="#333" stroke-width="1.5"/>
- Return ONLY the raw <svg>...</svg> block, nothing else.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const match = text.match(/<svg[\s\S]*<\/svg>/i);
    if (match) {
      const svg = match[0];
      // Save to session cache and shared Supabase table
      _svgCache[exerciseName.toLowerCase().trim()] = svg;
      saveIllustration(exerciseName, svg); // fire-and-forget, non-blocking
      return svg;
    }
  } catch (e) {
    // Silently fall back — never break the UI
  }
  return EXERCISE_SVG.default;
}

// ─── Full lookup chain: memory → Supabase → generate ───
async function getExerciseSVGAsync(exerciseName) {
  const n = (exerciseName || '').toLowerCase().trim();

  // 1. Keyword match — instant, zero cost
  if (/breath|diaphragm|spinal breath/.test(n))        return EXERCISE_SVG.breathing;
  if (/shoulder roll/.test(n))                          return EXERCISE_SVG['shoulder-rolls'];
  if (/neck roll|cervical/.test(n))                     return EXERCISE_SVG['neck-rolls'];
  if (/side stretch|lateral/.test(n))                   return EXERCISE_SVG['side-stretch'];
  if (/cat|cow/.test(n))                                return EXERCISE_SVG['cat-cow'];
  if (/knee.?to.?chest|supine knee/.test(n))            return EXERCISE_SVG['knee-to-chest'];
  if (/spinal twist|supine twist|rotation/.test(n))     return EXERCISE_SVG['spinal-twist'];
  if (/thoracic/.test(n))                               return EXERCISE_SVG['thoracic-rotation'];
  if (/chest.?open|doorframe|pec/.test(n))              return EXERCISE_SVG['chest-opener'];
  if (/legs.?up|wall.?hamstring/.test(n))               return EXERCISE_SVG['legs-up-wall'];
  if (/child|childs/.test(n))                           return EXERCISE_SVG['childs-pose'];
  if (/ankle pump|ankle circle/.test(n))                return EXERCISE_SVG['ankle-pumps'];
  if (/bridge|glute/.test(n))                           return EXERCISE_SVG.bridge;
  if (/plank/.test(n))                                  return EXERCISE_SVG.plank;
  if (/hip.?flex|lunge/.test(n))                        return EXERCISE_SVG['hip-flexor'];
  if (/squat/.test(n))                                  return EXERCISE_SVG.squat;
  if (/seated|sit|desk|chair/.test(n))                  return EXERCISE_SVG.seated;

  // 2. In-memory session cache — already generated this session
  if (_svgCache[n]) return _svgCache[n];

  // 3. Shared Supabase table — generated by any user before
  const cached = await getIllustration(n);
  if (cached) {
    _svgCache[n] = cached; // store in memory so next call in session is instant
    return cached;
  }

  // 4. Nothing found anywhere — generate fresh via Claude API and save for everyone
  return await generateExerciseSVG(exerciseName);
}

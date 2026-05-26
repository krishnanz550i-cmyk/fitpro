// ─── Chat State ───
let chatHistory = [];
let isStreaming = false;

// ─── System prompt — trimmed for token efficiency ───
function buildSystemPrompt(profile) {
  const conds = profile?.health_notes?.trim();
  const safetyBlock = conds ? `SAFETY: Adapt all exercises for: ${conds}. Spinal/nerve: no heavy loading, stop if tingling increases. ACL/knee: no flexion >90°, no jumping. Back: thoracic mobility focus. Always say stop if sharp pain. Never diagnose.` : `SAFETY: Always include stop-if-pain reminders. Never diagnose.`;

  return `You are FitPro, a personal trainer. You are warm, encouraging, patient, and supportive — never pushy, never guilt-tripping, never sarcastic. Always kind.
Profile: ${profile?.name || 'User'} | Goal: ${profile?.goal || 'general fitness'} | Session: ${profile?.duration || '20'} min
${safetyBlock}

TONE RULES — always follow:
- Never pressure, guilt, or rush the user
- Never say things like "you're wasting time" or "stop researching and start moving"
- If the user asks about an exercise for reference or curiosity, answer helpfully without judgment
- Be a supportive coach, not a drill sergeant

CRITICAL FORMAT RULES — you MUST follow these exactly, no exceptions:
1. NEVER use # headers or ## headers. Never.
2. NEVER use **bold** or *italic* markdown.
3. NEVER use --- separators.
4. When giving ANY exercise list, demonstration, or reference (even a single exercise), ALWAYS use this exact numbered format:

1. Exercise Name
   detail: sets/reps/duration and position
   ⚠ safety note if needed

2. Exercise Name
   detail: sets/reps/duration and position

Even if it is just ONE exercise being shown for reference, still use the numbered format starting at 1.
Nothing else. No setup sections. No "The Movement" blocks. Just the numbered list.

5. For questions or conversation (not exercise lists): plain short prose only, max 3 sentences per paragraph.`;
}

// ─── Strip any leftover markdown from AI responses ───
function stripMarkdown(text) {
  return text
    .replace(/^#{1,3}\s+/gm, '')       // remove # ## ###
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')  // remove **bold** *italic*
    .replace(/^---+$/gm, '')            // remove --- separators
    .replace(/^\s*[-–]\s+/gm, '• ')    // normalise bullet dashes
    .replace(/\n{3,}/g, '\n\n')       // collapse excess blank lines
    .trim();
}

// ─── Main Claude API call via Supabase Edge Function ───
// Retries once automatically on failure (handles cold start / shutdown)
async function callClaude(messages, systemOverride = null, attempt = 1) {
  const system = systemOverride || buildSystemPrompt(currentProfile);
  try {
    const response = await fetch(CONFIG.EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, system })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `API error ${response.status}`);
    }
    const data = await response.json();
    return data.content?.[0]?.text || data.text || '';
  } catch (e) {
    // Auto-retry once after 2s — handles Edge Function cold start / shutdown
    if (attempt === 1) {
      await new Promise(r => setTimeout(r, 2000));
      return callClaude(messages, systemOverride, 2);
    }
    throw e;
  }
}

// ─── Detect if a response contains an exercise list ───
function isExerciseResponse(text) {
  // Numbered list: "1. Exercise"
  const numbered = text.match(/^\d+[.)]\s+\S/mg);
  if (numbered && numbered.length >= 2) return true;
  // Also catch ## Exercise style (Claude ignoring format rules)
  const headers = text.match(/^#{1,3}\s+\*{0,2}Exercise/mgi);
  if (headers && headers.length >= 1) return true;
  return false;
}

// ─── Send a message ───
async function sendMessage(text, fromUser = true) {
  if (isStreaming) return;
  if (!text.trim()) return;

  if (fromUser) appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });
  if (currentUser) saveChatMessage(currentUser.id, 'user', text).catch(() => {});

  const typingId = showTyping();
  isStreaming = true;

  try {
    // Token efficiency: keep last 8 messages (4 exchanges) not 12
    const contextHistory = chatHistory.slice(-9, -1);
    const rawReply = await callClaude(contextHistory.concat([{ role: 'user', content: text }]));
    const reply = stripMarkdown(rawReply);

    removeTyping(typingId);

    // Render as visual exercise cards if it's a workout list, otherwise plain chat
    if (isExerciseResponse(reply)) {
      appendExerciseMsg(reply);
    } else {
      appendMsg('assistant', reply);
    }

    chatHistory.push({ role: 'assistant', content: reply });
    if (currentUser) saveChatMessage(currentUser.id, 'assistant', reply).catch(() => {});

  } catch (e) {
    removeTyping(typingId);
    let errMsg = 'Sorry, I could not connect right now.';
    if (e.message?.includes('Edge Function') || e.message?.includes('not deployed')) {
      errMsg = 'Edge Function not deployed yet. See setup guide.';
    } else if (e.message?.includes('401')) {
      errMsg = 'API key issue. Check your Supabase Edge Function.';
    } else if (e.message?.includes('Failed to fetch') || e.message?.includes('NetworkError')) {
      errMsg = 'Network error — check your connection and try again.';
    }
    // Show error with a retry button
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'msg assistant';
    div.innerHTML = `
      <div class="msg-bubble msg-error">
        ${escapeHtml(errMsg)}
        <button class="retry-btn" onclick="retryLastMessage()">↺ Retry</button>
      </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  isStreaming = false;
}

// ─── Retry last user message ───
function retryLastMessage() {
  // Find the last user message in history
  const lastUser = [...chatHistory].reverse().find(m => m.role === 'user');
  if (!lastUser) return;
  // Remove the error bubble
  const container = document.getElementById('chat-messages');
  const lastMsg = container.lastElementChild;
  if (lastMsg) lastMsg.remove();
  // Remove last user entry from history to avoid duplication
  const idx = chatHistory.lastIndexOf(lastUser);
  chatHistory.splice(idx, 1);
  // Resend
  sendMessage(lastUser.content, false);
}

// ─── Send from input box ───
async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || isStreaming) return;
  input.value = '';
  input.style.height = 'auto';
  document.getElementById('chat-suggestions').style.display = 'none';
  await sendMessage(text, true);
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

// ─── Append a plain chat message ───
function appendMsg(role, text) {
  const container = document.getElementById('chat-messages');
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-bubble">${escapeHtml(text)}</div>
    <div class="msg-time">${role === 'assistant' ? 'FitPro · ' : ''}${time}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ─── Append an exercise response as visual cards ───
function appendExerciseMsg(text) {
  const container = document.getElementById('chat-messages');
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Split: everything before the first numbered item is intro text
  const firstNumIdx = text.search(/^\d+[.)]\s+/m);
  const intro = firstNumIdx > 0 ? text.slice(0, firstNumIdx).trim() : '';
  const listText = firstNumIdx >= 0 ? text.slice(firstNumIdx) : text;

  // Find trailing text after last exercise block
  const exercises = parseExerciseResponse(listText);

  const div = document.createElement('div');
  div.className = 'msg assistant';

  let html = '';
  if (intro) {
    html += `<div class="msg-bubble msg-intro">${escapeHtml(intro)}</div>`;
  }
  div.innerHTML = html;

  // Render exercise cards
  if (exercises.length > 0) {
    const cards = renderExerciseCards(exercises);
    if (cards) div.appendChild(cards);
  } else {
    // Fallback: plain bubble
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = escapeHtml(listText);
    div.appendChild(bubble);
  }

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = `FitPro · ${time}`;
  div.appendChild(timeEl);

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'msg assistant';
  div.id = id;
  div.innerHTML = `<div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// ─── Clear chat ───
async function clearChat() {
  if (!confirm('Clear all chat messages?')) return;
  chatHistory = [];
  const container = document.getElementById('chat-messages');
  container.innerHTML = `
    <div class="chat-welcome">
      <div class="chat-welcome-logo">F</div>
      <div class="chat-welcome-text">Hi! I'm your FitPro trainer. Ask me anything — workouts, how your body feels today, what to do about that knee, or just tell me you only have 5 minutes.</div>
    </div>`;
  document.getElementById('chat-suggestions').style.display = 'flex';
  // Clear from DB too
  if (currentUser) {
    try {
      const sb = initSupabase();
      await sb.from('chat_history').delete().eq('user_id', currentUser.id);
    } catch (e) { /* silently ignore */ }
  }
  showToast('Chat cleared');
}

// ─── Load chat history from DB on view open ───
document.querySelector('.nav-item[onclick="switchView(\'chat\')"]')?.addEventListener('click', async () => {
  if (chatHistory.length === 0 && currentUser) {
    const history = await getRecentChatHistory(currentUser.id, 10);
    chatHistory = history;
    const container = document.getElementById('chat-messages');
    if (history.length > 0) {
      container.innerHTML = '';
      history.forEach(m => appendMsg(m.role, m.content));
    }
  }
});

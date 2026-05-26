// ─── Chat State ───
let chatHistory = [];
let isStreaming = false;

// ─── System prompt builder (uses user profile for full context) ───
function buildSystemPrompt(profile) {
  const base = `You are FitPro, a personal trainer and wellness coach. You are warm, knowledgeable, and safety-first.

USER PROFILE:
- Name: ${profile?.name || 'User'}
- Goal: ${profile?.goal || 'general fitness'}
- Default workout time: ${profile?.default_time || 'morning'}
- Session length: ${profile?.duration || '20'} minutes
- Health conditions: ${profile?.health_notes || 'None provided'}

CRITICAL SAFETY RULES (never break these):
1. Always adapt exercises for the user's specific health conditions
2. For spinal nerve compression: no heavy spinal loading, no deep forward folds without support, stop if tingling increases
3. For ACL recovery: no knee flexion beyond 90°, no jumping, no pivoting, always supported standing
4. For upper back/desk pain: prioritize thoracic mobility, chest openers, postural correction
5. Always remind the user to stop if they feel sharp pain or neurological symptoms
6. Never diagnose. For medical questions, recommend they consult their doctor/physio.

PERSONALITY:
- Conversational and encouraging, not robotic
- Give specific, actionable advice tailored to their conditions
- When suggesting exercises, always include duration/reps and safety notes
- For scheduling, offer multiple alternatives and be flexible
- Track and reference what they tell you in the conversation
- When they report pain or progress, acknowledge it and adjust suggestions accordingly

FORMATTING:
- Use clear structure for exercise lists (numbered, with reps and duration)
- Keep responses concise — detailed but not overwhelming
- Use natural language, not clinical jargon`;
  return base;
}

// ─── Main Claude API call via Supabase Edge Function ───
async function callClaude(messages, systemOverride = null) {
  const system = systemOverride || buildSystemPrompt(currentProfile);
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
}

// ─── Send a message ───
async function sendMessage(text, fromUser = true) {
  if (isStreaming) return;
  if (!text.trim()) return;

  // Add to UI
  if (fromUser) appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });

  // Save to DB (background)
  if (currentUser) saveChatMessage(currentUser.id, 'user', text).catch(() => {});

  // Show typing
  const typingId = showTyping();
  isStreaming = true;

  try {
    // Build context: recent history (last 10 messages)
    const contextHistory = chatHistory.slice(-12, -1);
    const reply = await callClaude(contextHistory.concat([{ role: 'user', content: text }]));

    removeTyping(typingId);
    appendMsg('assistant', reply);
    chatHistory.push({ role: 'assistant', content: reply });

    // Save to DB (background)
    if (currentUser) saveChatMessage(currentUser.id, 'assistant', reply).catch(() => {});

  } catch (e) {
    removeTyping(typingId);
    let errMsg = 'Sorry, I could not connect right now.';
    if (e.message?.includes('Edge Function')) errMsg = 'Edge Function not deployed yet. See setup guide.';
    else if (e.message?.includes('401')) errMsg = 'API key issue. Check your Supabase Edge Function.';
    appendMsg('assistant', errMsg);
  }

  isStreaming = false;
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

// ─── UI helpers ───
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
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
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

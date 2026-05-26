// ─────────────────────────────────────────────
// FitPro Configuration
// Replace the values below with your own.
// DO NOT share this file with anyone.
// ─────────────────────────────────────────────

const CONFIG = {

  // Supabase
  SUPABASE_URL: 'https://yvjndkkzikeghbcohfsw.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2am5ka2t6aWtlZ2hiY29oZnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzY0MjUsImV4cCI6MjA5NTM1MjQyNX0.uJyMlYbSMuvy9GPgNAemuO7sPr0wjZY67KgqifhZEF0',

  // App unlock password (hashed in localStorage after first set)
  // Change this to your own password
  APP_PASSWORD: 'REPLACE_YOUR_APP_PASSWORD_HERE',

  // Admin username (email used during signup)
  ADMIN_EMAIL: 'REPLACE_YOUR_ADMIN_EMAIL_HERE',

  // Supabase Edge Function URL for Claude API calls
  // After deploying the edge function, paste its URL here
  EDGE_FUNCTION_URL: 'https://yvjndkkzikeghbcohfsw.supabase.co/functions/v1/chat',

};

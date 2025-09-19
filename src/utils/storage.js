// Local storage helpers for MindCare voice therapy prototype

const STORAGE_KEYS = {
  settings: "mindcare_settings",
  sessions: "mindcare_sessions",
};

export function loadSettings() {
  const envKey = (import.meta && import.meta.env && import.meta.env.VITE_OPENROUTER_API_KEY) || "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";
  const defaults = { apiKey: envKey, model: "deepseek/deepseek-chat-v3.1:free", voice: "default" };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    // If no API key saved, fall back to env value
    if (!parsed.apiKey && envKey) parsed.apiKey = envKey;
    return parsed;
  } catch {
    return defaults;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

export function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.sessions);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
}

export function appendSession(session) {
  const sessions = loadSessions();
  sessions.push(session);
  saveSessions(sessions);
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.settings);
  localStorage.removeItem(STORAGE_KEYS.sessions);
}

export function getLastSession() {
  const sessions = loadSessions();
  return sessions.length ? sessions[sessions.length - 1] : null;
}



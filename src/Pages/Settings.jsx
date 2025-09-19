import { useEffect, useState } from "react";
import { loadSettings, saveSettings } from "../utils/storage";

function Settings() {
  const [form, setForm] = useState(loadSettings());
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      setVoices(v || []);
    }
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSave() {
    saveSettings(form);
    alert("Settings saved locally");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Settings</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm text-blue-700 mb-1">OpenRouter API Key</label>
            <input
              type="password"
              name="apiKey"
              value={form.apiKey}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="sk-or-v1-..."
            />
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Model</label>
            <select
              name="model"
              value={form.model}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="deepseek/deepseek-chat-v3.1:free">DeepSeek Chat v3.1 (Free)</option>
              <option value="openrouter/auto">Auto</option>
              <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
              <option value="openai/gpt-4o-mini">GPT-4o mini</option>
              <option value="google/gemini-1.5-pro">Gemini 1.5 Pro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Voice Preference</label>
            <select
              name="voice"
              value={form.voice || "default"}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="default">System default</option>
              <option value="male">Prefer male</option>
              <option value="female">Prefer female</option>
            </select>
            <p className="text-xs text-blue-700 mt-1">Actual available voices depend on your device/browser.</p>
          </div>
          <div>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;



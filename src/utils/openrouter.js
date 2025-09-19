// Minimal OpenRouter client using fetch

export async function chatWithOpenRouter({ apiKey, model, messages }) {
  if (!apiKey) {
    throw new Error("Missing OpenRouter API key in settings");
  }
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": (import.meta?.env?.VITE_SITE_URL) || window.location.origin,
      "X-Title": (import.meta?.env?.VITE_SITE_NAME) || "MindCare",
    },
    body: JSON.stringify({
      model: model || "deepseek/deepseek-chat-v3.1:free",
      messages,
      temperature: 0.7,
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter error: ${response.status} ${text}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "";
  return content;
}



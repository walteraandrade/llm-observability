const readEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value;
};

const baseUrl = readEnv("LLM_BASE_URL");
const apiKey = readEnv("LLM_API_KEY");
const model = readEnv("LLM_MODEL");

const question = "In one sentence, what is observability?";

const response = await fetch(`${baseUrl}/chat/completions`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model,
    messages: [{ role: "user", content: question }],
  }),
});

if (!response.ok) {
  // Read as text: error bodies are not always valid JSON (e.g. proxy HTML pages)
  const errorBody = await response.text();
  console.error(`HTTP ${response.status} ${response.statusText}`);
  console.error(errorBody);
  process.exit(1);
}

const data = await response.json();

console.log("=== Answer ===");
console.log(data.choices[0].message.content);

console.log("\n=== Full JSON ===");
console.log(JSON.stringify(data, null, 2));

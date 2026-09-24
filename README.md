# LLM observability — step 1

Minimal script that calls an OpenAI-compatible chat completions API with native `fetch`.

## Run

Requires Node.js >= 22.18 (runs `.ts` natively and reads `.env` with `--env-file`).

```bash
npm install
cp .env.example .env   # fill in LLM_API_KEY
npm start
```

Type-check only: `npm run typecheck`.

To use Ollama, swap the variables in `.env` (see `.env.example`).

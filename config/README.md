# Local environment configuration

Runtime secrets for this workshop live here as `config/.env`.

## Setup

The committed template stays at the **repository root**. Copy it into this folder:

```powershell
Copy-Item .env.example config\.env
```

Edit `config/.env` and set at least `OPENAI_API_KEY`.

## Rules

- Commit root `.env.example` only (the template)
- Never commit `config/.env`
- Prefer `config/.env` over a legacy repo-root `.env` (still loaded as a fallback)

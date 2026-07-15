# SPIKE-002: Personal Deploy-After-Session Ladder

## Status

Ready to execute — personal learning only (Path A runbook validated against current repo layout)

## Question

How can the repository owner deploy the evolving application after each session for personal practice **without** conflicting with Session 7 (packaging) or Session 13 (canonical cloud deployment for attendees)?

## Governance

| Rule | Application |
| ---- | ----------- |
| [co-architect-operating-guidance.md §7](../co-architect-operating-guidance.md) | Personal learning — not curriculum |
| Capability Roadmap | **Not modified** — no new row for early cloud deploy |
| ADRs | **No ADR** — this is investigative, not a project decision for attendees |
| Presentation | **Not linked** from `presentation/demo-0N/` |
| Tags | **No `vN.0-*` tag** — personal branches only ([ADR-002](../ADRs/ADR-002-git-tags.md)) |
| Session 13 | Remains the canonical **audience** lesson for Kubernetes and AWS |

## Why this matters

Deploying after every session builds real operational muscle memory. The curriculum deliberately defers deployment concepts so Session 1 can focus on the agent loop. That deferral applies to **attendees**, not to the repository owner's personal learning path.

## Session 1 runtime shape (baseline)

Demo 1 runs as:

| Component | How it runs locally |
| --------- | ------------------- |
| Frontend | Vite dev server (`npm run dev`, port 5173) |
| Backend | `uvicorn` on port 8000 |
| MCP server | Stdio child process spawned by the backend per chat request |

A minimal personal deploy therefore needs **two deployable units**: static frontend + backend (MCP stays embedded via stdio). See [03-getting-started.md](../03-getting-started.md).

### Session 1 personal deploy constraints

- Build frontend (`npm run build`) and serve static files via nginx on the same host as the API (recommended), or S3 + CloudFront (split-host — requires personal branch for API base URL).
- Run backend on loopback (`127.0.0.1:8000`) behind nginx, managed by `systemd`.
- Same-origin nginx proxy avoids changing `CORS_ORIGINS` for Path A (see runbook below).
- Store `OPENAI_API_KEY` in instance `.env` referenced by systemd — **not** in git.
- Ensure `uv` is on PATH for the service user (MCP spawns via `uv run python`).
- No Docker required for this spike (Session 7 owns containerization for the curriculum).
- No Kubernetes, Terraform, or IaC required (Session 13 owns cloud orchestration for the curriculum).

**Runbook:** [Session 1 — Path A (EC2 + nginx + systemd)](#session-1-runbook--path-a-recommended-single-ec2--nginx--systemd)

Record what worked in a personal branch; promote lessons to Session 7/13 artifacts only after curriculum review.

## Personal deploy ladder (by session band)

This ladder is for **Swamy's learning**. Attendees follow the master plan.

| After session | Personal deploy target | Curriculum owns |
| ------------- | ---------------------- | --------------- |
| **1–6** | Optional: single VM or managed service (EC2, App Runner); manual process manager (`systemd`) | Local dev only |
| **7** | `docker compose up` on a VM; optional push to ECR | Docker, CI, smoke tests, health checks |
| **8–9** | Same compose stack + eval/guardrail env vars | Local capstone |
| **10** | Compose + PostgreSQL sidecar or RDS | Distributed persistence lesson |
| **11** | Compose + Kafka (or managed MSK experiment) | Event-driven lesson |
| **12** | Aspire sample or compose with gateway service | Model Gateway lesson |
| **13** | **Align with** `infra/kubernetes/` and `infra/cloud/aws/` curriculum artifacts | Canonical audience cloud deploy |
| **14–15** | Full platform + enterprise ops overlays | Enterprise operations |

### Complexity budget

- **Sessions 1–6:** optimize for "reachable URL" and env config — not production hardening.
- **Session 7+:** reuse Docker artifacts from the curriculum instead of maintaining parallel bare-metal scripts.
- **Session 13+:** stop maintaining personal one-off deploy scripts; use curriculum `infra/` as the single cloud path.

## Acceptance criteria (spike complete when)

- [ ] Session 1 agent responds at a public URL (health + one calculator prompt).
- [ ] Deploy notes captured in this spike (commands, ports, env vars, rollback).
- [ ] No changes to Capability Roadmap, ADRs (except spike references), or presentation scripts.
- [ ] Clear "not for attendees" banner remains in this document.
- [ ] Lessons that belong in Session 7 or 13 are listed under **Promotion candidates** — not implemented as curriculum yet.

## Promotion candidates (do not implement without review)

| Personal lesson | Possible future home |
| --------------- | -------------------- |
| Docker packaging | Session 7 — [12-production.md](../12-production.md) |
| CI deploy + smoke gate | Session 7 — `.github/workflows/ci-deploy.yml` |
| K8s manifests, ingress, secrets | Session 13 — `infra/kubernetes/` |
| AWS-specific templates | Session 13 — `infra/cloud/aws/` |

## Out of scope

- Audience-facing lab under `presentation/demo-01/extensions/`
- ADR-008 or any "early AWS deploy" curriculum extension
- Modifying Session 1 engineering question ("How does an Agent work?")
- Live demo of personal deploy during Session 1
- Autoscaling, multi-AZ, secrets manager patterns (Session 13+)

## Outcome

When Session 1 personal deploy succeeds, record results in the **Session 1 runbook** below. Repeat for later sessions only when the personal ladder adds a new deploy surface (e.g., Postgres after Session 10).

---

## Session 1 runbook — Path A (recommended): single EC2 + nginx + systemd

> **Governance:** Personal spike only. Not linked from presentation. Not for attendees until Session 13.
>
> **Why this path:** Demo 1 frontend calls relative URLs (`/api/chat`, `/health`). Vite proxies those in dev. nginx on the same host reproduces that pattern — **no frontend code changes** and no cross-origin CORS headaches.

### Architecture

```text
Internet
    │
    ▼
EC2 (Ubuntu 24.04, t3.small)
    │
    ├── nginx :80  ──► /           → static files (Vite dist/)
    │              ──► /api/*      → proxy → uvicorn :8000 (loopback)
    │              ──► /health     → proxy → uvicorn :8000
    │
    └── systemd: agentic-api
            └── uvicorn (FastAPI)
                    └── MCP stdio child (uv run python server.py per chat)
```

MCP stays embedded: the backend spawns `uv run python src/mcp-server/server.py` via stdio ([`agent.py`](../../src/backend/app/agent_runtime/agent.py)). The full repo clone plus `uv` on the instance is required.

### Prerequisites (your laptop)

| Item | Notes |
| ---- | ----- |
| AWS account | Billing alerts recommended for personal lab |
| SSH key pair | For EC2 access |
| Git clone of this repo | Same branch/tag you want deployed |
| `OPENAI_API_KEY` | Set only in server `.env` — never commit |

Reference configs (copy to the instance):

- [`assets/session-1-ec2/nginx-agentic.conf`](./assets/session-1-ec2/nginx-agentic.conf)
- [`assets/session-1-ec2/agentic-api.service`](./assets/session-1-ec2/agentic-api.service)

### Step 1 — Launch EC2

1. **AMI:** Ubuntu Server 24.04 LTS (x86_64).
2. **Instance type:** `t3.small` (enough for `npm run build` on-box; `t3.micro` works if you build locally and rsync `dist/`).
3. **Storage:** 20 GiB gp3.
4. **Security group:**

   | Port | Source | Purpose |
   | ---- | ------ | ------- |
   | 22 | Your IP only | SSH |
   | 80 | `0.0.0.0/0` | HTTP (add 443 after TLS) |

5. **Elastic IP (optional):** Assign so the public URL survives stop/start.

### Step 2 — Install runtime on the instance

SSH in, then:

```bash
sudo apt-get update
sudo apt-get install -y git curl nginx

# Python 3.13 via deadsnakes (repo requires >=3.13)
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt-get install -y python3.13 python3.13-venv

# uv (used by backend + MCP spawn)
curl -LsSf https://astral.sh/uv/install.sh | sh
source "$HOME/.bashrc"

# Node 20 LTS (frontend build)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3 — Clone app and configure secrets

```bash
sudo mkdir -p /opt/agentic
sudo chown "$USER:$USER" /opt/agentic
cd /opt/agentic

git clone https://github.com/vishipayyallore/agentic-engineering-in-practice.git
cd agentic-engineering-in-practice

# Pin to a known tag when reproducing a session milestone, e.g.:
# git checkout v1.0-build-your-first-agent

cp .env.example .env
nano .env   # set OPENAI_API_KEY=sk-...
```

**`.env` on the server (minimum):**

```text
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
LLM_PROVIDER=openai
```

`CORS_ORIGINS` can stay at localhost defaults when nginx serves frontend and API on the **same origin**. You only need to change `CORS_ORIGINS` if the browser talks to the API on a different host (Path B below).

Install Python deps from repo root:

```bash
cd /opt/agentic/agentic-engineering-in-practice
uv sync --all-groups
uv run pytest -q   # optional sanity check
```

### Step 4 — Build frontend

```bash
cd /opt/agentic/agentic-engineering-in-practice/src/frontend
npm ci
npm run build

sudo mkdir -p /opt/agentic/frontend-dist
sudo rsync -a --delete dist/ /opt/agentic/frontend-dist/
sudo chown -R www-data:www-data /opt/agentic/frontend-dist
```

**Faster redeploys:** run `npm run build` on your laptop and `rsync -avz dist/ ubuntu@<EC2_IP>:/opt/agentic/frontend-dist/` instead.

### Step 5 — systemd backend service

Adjust paths in [`agentic-api.service`](./assets/session-1-ec2/agentic-api.service) if your user or install dir differs, then:

```bash
sudo cp docs/spikes/assets/session-1-ec2/agentic-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now agentic-api
sudo systemctl status agentic-api
```

Backend listens on **127.0.0.1:8000** only (not exposed publicly — nginx is the edge).

Quick API check on the instance:

```bash
curl -s http://127.0.0.1:8000/health | jq .
```

### Step 6 — nginx

```bash
sudo cp docs/spikes/assets/session-1-ec2/nginx-agentic.conf /etc/nginx/sites-available/agentic
sudo ln -sf /etc/nginx/sites-available/agentic /etc/nginx/sites-enabled/agentic
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7 — Verify from your browser

Replace `<EC2_PUBLIC_IP>` with your Elastic IP or public DNS.

| Check | URL / action | Expected |
| ----- | ------------ | -------- |
| Health | `http://<EC2_PUBLIC_IP>/health` | JSON with `"status":"ok"` |
| Home | `http://<EC2_PUBLIC_IP>/` | Demo 1 home page |
| Level 2 agent | `http://<EC2_PUBLIC_IP>/demo/level-2` | Prompt: `What is 15 * 23?` → Decision Timeline shows `calculate` |
| Calculator | Same page, `15 * 23` | Answer `345` |

From your laptop:

```bash
curl -s "http://<EC2_PUBLIC_IP>/health"
curl -s -X POST "http://<EC2_PUBLIC_IP>/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What is 15 * 23?"}' | head -c 500
```

### Step 8 — TLS (optional, recommended)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
# Point a DNS A record at the Elastic IP first, e.g. agent-lab.example.com
sudo certbot --nginx -d agent-lab.example.com
```

Certbot updates the nginx site for HTTPS. Renewals are automatic.

### Redeploy after a session (personal workflow)

```bash
cd /opt/agentic/agentic-engineering-in-practice
git fetch --tags
git checkout main   # or your personal/deploy-session-N branch
git pull

uv sync --all-groups
cd src/frontend && npm ci && npm run build
sudo rsync -a --delete dist/ /opt/agentic/frontend-dist/

sudo systemctl restart agentic-api
# nginx reload only if config changed
```

### Rollback

```bash
cd /opt/agentic/agentic-engineering-in-practice
git checkout <previous-tag-or-commit>
uv sync --all-groups
# rebuild frontend if needed
sudo systemctl restart agentic-api
```

### Troubleshooting

| Symptom | Likely cause | Fix |
| ------- | ------------- | --- |
| `502 Bad Gateway` on `/api/*` | Backend not running | `journalctl -u agentic-api -e` |
| Health OK, chat 500 | Missing `OPENAI_API_KEY` | Check `/opt/agentic/.../.env` and `EnvironmentFile` in systemd unit |
| Chat hangs then 504 | nginx timeout | `proxy_read_timeout 120s` already in sample config |
| MCP / tool errors | `uv` not on PATH for systemd | Use full path in `agentic-api.service` `ExecStart` / ensure `uv` installed for service user |
| React routes 404 | SPA fallback missing | Confirm `try_files ... /index.html` in nginx |
| `npm run build` OOM on t3.micro | Low memory | Build locally and rsync `dist/`, or use t3.small |

### Path A execution log (fill when deployed)

```text
Date:
EC2 instance id:
Public URL:
Git ref deployed:
CORS_ORIGINS used: (default localhost — same-origin via nginx)
First successful calculator prompt: yes / no
Notes / failures:
```

---

## Session 1 runbook — Path B (alternative): split static + API hosts

Use when you want S3/CloudFront for the UI and EC2 (or App Runner) for the API only.

| Piece | Target |
| ----- | ------ |
| Frontend | S3 bucket + CloudFront → `https://app.example.com` |
| Backend | EC2 or App Runner → `https://api.example.com` |

**Extra work vs Path A:**

1. Set `CORS_ORIGINS=https://app.example.com` in server `.env`.
2. Frontend today uses relative `/api/...` URLs ([`api.ts`](../../src/frontend/src/services/api.ts)) — split hosts require a **personal branch** change, e.g. `VITE_API_BASE_URL` and prefixing fetch calls. That is intentional spike code, not curriculum.
3. App Runner: deploy backend container or source bundle; MCP still needs `uv` + full repo in the image — simpler after Session 7 Docker exists.

**Recommendation:** Use Path A for Session 1 personal learning. Revisit Path B after Session 7 when a Dockerfile exists.

### Path B execution log (fill if attempted)

```text
Date:
Frontend URL:
Backend URL:
CORS_ORIGINS used:
Personal branch name (if API base URL patched):
Notes / failures:
```

---

## Session 1 runbook — Path C (skip for now): AWS App Runner only

App Runner fits a **single** long-running HTTP service. Demo 1 needs static frontend + API + MCP subprocess. Without Docker (Session 7), you would maintain a custom build spec and process supervisor — more friction than Path A.

**Defer App Runner** until Session 7 `docker-compose.yml` can produce one backend image; then App Runner is a natural personal experiment for API-only hosting.

---

## Spike completion checklist

- [ ] Path A deployed and calculator prompt works at a public URL
- [ ] Execution log filled in above
- [ ] No changes to Capability Roadmap, ADRs, or `presentation/demo-01/`
- [ ] Secrets only in server `.env` or AWS Parameter Store — not in git
- [ ] Lessons for Session 7/13 captured under **Promotion candidates** if applicable

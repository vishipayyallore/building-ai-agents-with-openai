# E2E smoke — backend must be running on port 8000
$ErrorActionPreference = "Stop"
$base = "http://127.0.0.1:8000"

Write-Host "=== GET /health ==="
$h = Invoke-RestMethod -Uri "$base/health"
Write-Host ($h | ConvertTo-Json -Compress)
if ($h.status -ne "ok") { throw "health.status expected ok" }
if ($h.maturityLevel -ne 2) { throw "health.maturityLevel expected 2" }
if ($h.maturityName -ne "PROXY_AGENT") { throw "health.maturityName expected PROXY_AGENT" }

Write-Host "=== POST /api/llm (Level 1) ==="
$llm = Invoke-RestMethod -Uri "$base/api/llm" -Method POST -ContentType "application/json" `
  -Body '{"message":"Say hi in one word"}'
Write-Host "maturityLevel=$($llm.maturityLevel) maturityName=$($llm.maturityName)"
if ($llm.maturityLevel -ne 1) { throw "llm.maturityLevel expected 1" }
if ($llm.maturityName -ne "DIRECT_LLM_INTERACTION") { throw "llm.maturityName mismatch" }
if (-not $llm.response) { throw "llm.response empty" }

Write-Host "=== POST /api/chat calculator (Level 2) ==="
$chat = Invoke-RestMethod -Uri "$base/api/chat" -Method POST -ContentType "application/json" `
  -Body '{"message":"What is 15 * 23?"}'
Write-Host "maturityLevel=$($chat.maturityLevel) events=$($chat.events.Count) response=$($chat.response)"
if ($chat.maturityLevel -ne 2) { throw "chat.maturityLevel expected 2" }
if ($chat.maturityName -ne "PROXY_AGENT") { throw "chat.maturityName mismatch" }
if ($chat.events.Count -lt 6) { throw "expected Decision Timeline events" }

Write-Host "=== POST /api/chat SOLID (no tool) ==="
$solid = Invoke-RestMethod -Uri "$base/api/chat" -Method POST -ContentType "application/json" `
  -Body '{"message":"What is SOLID?"}'
$toolSelected = @($solid.events | Where-Object { $_.event -eq "ToolSelected" })
Write-Host "events=$($solid.events.Count) ToolSelected=$($toolSelected.Count)"

Write-Host "=== E2E PASS ==="

# SPIKE-001: Provider SDK Compatibility

## Status

Planned

## Question

Can the OpenAI Agent SDK cleanly support OpenAI and AWS Bedrock within one Session 3 agent runtime, and can Azure OpenAI be added later as an extension without changing the provider interface?

## Why this matters

Session 3 teaches that the agent architecture is independent of the underlying model provider. That lesson is valid only if the implementation can keep OpenAI and AWS Bedrock details behind `agent_runtime/llm/` without leaking them into the Agent Runtime, MCP tools, or dashboard contract. Azure OpenAI then tests whether the abstraction is open for extension and closed for modification.

## Providers to verify

| Provider | Deployment model | What to verify |
| -------- | ---------------- | -------------- |
| OpenAI | Public OpenAI API | Baseline Agent SDK flow, model config, tool calling |
| AWS Bedrock | AWS-native model service | IAM auth, regional model ID, adapter requirements, tool-calling compatibility |
| Azure OpenAI | Microsoft enterprise service | Extension path: endpoint, deployment name, identity/key auth, Agent SDK compatibility |

## Acceptance criteria

- `agent_runtime/llm/provider.py` can define one small provider contract for Session 3.
- OpenAI and AWS Bedrock can each run the same calculator prompt through the same public application flow.
- Azure OpenAI can be added as a new provider implementation without changing `provider.py`, the Agent Runtime, MCP tools, or dashboard contract.
- Provider-specific configuration stays in settings and provider implementations.
- The dashboard can show separate Current Provider and Current Model values.
- If the Agent SDK cannot support a provider directly, the spike documents the required adapter approach without changing the public architecture.

## Out of scope

- Model Gateway routing
- Retries and fallback
- Cost optimization
- Prompt caching
- Production telemetry
- Adding Gemini, Anthropic direct API, or other providers

## Outcome

Record the spike result before Session 3 is finalized. If OpenAI + AWS Bedrock succeeds, use that pair in the live curriculum. If Azure OpenAI succeeds, document it as the provider extension. If a provider reveals SDK limitations, keep the interface and document the required adapter approach.

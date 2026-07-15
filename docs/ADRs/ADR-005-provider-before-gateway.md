# ADR-005: Use a Provider Pattern Before Introducing a Gateway Pattern

## Status

Accepted

## Context

Session 1 starts with a direct OpenAI Agent SDK path so learners can understand the agent loop, MCP, tool calling, and the Decision Timeline before studying provider abstraction.

Session 3 introduces AWS Bedrock alongside OpenAI. That creates a real problem: the Agent Runtime should not hard-code one vendor-specific client or leak provider-specific details into the rest of the application.

These providers represent distinct deployment models: public OpenAI API versus AWS Bedrock as an AWS-managed AI platform with IAM, Bedrock Runtime, and many foundation models behind one service. That problem does not require an enterprise Model Gateway. Session 3 does not need provider routing, fallback policies, retries, caching, cost optimization, telemetry, or model governance.

Azure OpenAI follows as an optional provider extension after Session 3. It demonstrates the Open/Closed Principle: the provider interface remains unchanged while a new enterprise provider implementation is added.

## Decision

Introduce a tiny LLM Provider Interface in Session 3 under `agent_runtime/llm/`:

```text
agent_runtime/
    llm/
        provider.py
        openai_provider.py
        bedrock_provider.py
```

The interface accepts messages and tool context, invokes the selected provider, and returns a response. It is intentionally not called a gateway.

Add `azure_openai_provider.py` as a guided extension after the Session 3 live curriculum. Introduce the Model Gateway in Phase II, when platform concerns create a real need for routing, fallback, retry policies, telemetry, cost, caching, and policy. The Gateway sits above the Provider Interface; it does not replace it.

## Consequences

- Session 1 stays focused on the agent loop.
- Session 3 demonstrates that the agent architecture is independent of the underlying model provider.
- Learners see the same prompt and same tools work with OpenAI and AWS Bedrock.
- Azure OpenAI reinforces extensibility without changing the interface.
- The first abstraction solves a current cloud-provider independence problem instead of anticipating future infrastructure.
- Phase II can replace or wrap the simple provider interface with a Model Gateway once platform behavior is the lesson.
- The progression stays explicit: one provider → multiple providers → provider interface → gateway → routing and observability.
- Spike-001 must validate whether the OpenAI Agent SDK can support OpenAI + AWS Bedrock cleanly for the live curriculum and Azure OpenAI as an extension.

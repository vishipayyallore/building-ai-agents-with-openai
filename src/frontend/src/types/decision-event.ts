export type DecisionEventType =
  | "PromptReceived"
  | "IntentIdentified"
  | "ExecutionPlanCreated"
  | "ToolSelected"
  | "ToolInvoked"
  | "ToolCompleted"
  | "ToolFailedHandled"
  | "ToolFailedUnhandled"
  | "SystemErrorRaised"
  | "ResponseSynthesized"
  | "ResponseDelivered";

export interface DecisionEventError {
  code: string;
  message: string;
  recoverable: boolean;
}

export interface DecisionEvent {
  event: DecisionEventType;
  timestamp: string;
  sessionId: string;
  requestId: string;
  sequence: number;
  tool?: string;
  agent?: string;
  params?: Record<string, unknown>;
  result?: unknown;
  error?: DecisionEventError;
  latencyMs?: number;
  metadata?: Record<string, unknown>;
}

export interface ChatResponse {
  sessionId: string;
  requestId: string;
  response: string;
  events: DecisionEvent[];
  maturityLevel: number;
  maturityName: string;
}

export interface LlmResponse {
  response: string;
  maturityLevel: number;
  maturityName: string;
}

/** Agent Maturity Levels — mirrors AgentMaturityLevel in backend models.py (§4.1). */
export type AgentMaturityLevel = 1 | 2 | 3 | 4 | 5;

export const AgentMaturityLevelName: Record<AgentMaturityLevel, string> = {
  1: "Direct LLM Interaction",
  2: "Proxy Agent",
  3: "Assistant System",
  4: "Autonomous Agent",
  5: "Multi-Agent System",
};

export type ToolState =
  | "available"
  | "selected"
  | "running"
  | "success"
  | "handled_failure"
  | "failed";

export const DEMO_TOOLS = ["calculate", "get_weather"] as const;

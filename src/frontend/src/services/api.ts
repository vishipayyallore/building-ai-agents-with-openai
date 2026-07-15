import type { ChatResponse, LlmResponse } from "../types/decision-event";

const REQUEST_TIMEOUT_MS = 60_000;

export interface HealthResponse {
  status: string;
  demo: string;
  maturityLevel: number;
  maturityName: string;
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetchWithTimeout("/health");
  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`);
  }
  return response.json() as Promise<HealthResponse>;
}

export async function sendDirectLlm(message: string): Promise<LlmResponse> {
  const response = await fetchWithTimeout("/api/llm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed (${response.status})`);
  }

  return response.json() as Promise<LlmResponse>;
}

export async function sendChat(
  message: string,
  sessionId?: string,
): Promise<ChatResponse> {
  const response = await fetchWithTimeout("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed (${response.status})`);
  }

  return response.json() as Promise<ChatResponse>;
}

import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchHealth, sendChat, sendDirectLlm } from "./api";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("api service", () => {
  it("fetchHealth returns parsed JSON on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: "ok",
          demo: "1",
          maturityLevel: 2,
          maturityName: "PROXY_AGENT",
        }),
      }),
    );

    const health = await fetchHealth();
    expect(health.status).toBe("ok");
    expect(health.maturityLevel).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      "/health",
      expect.objectContaining({ signal: expect.any(Object) }),
    );
  });

  it("sendDirectLlm posts message JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          response: "hi",
          maturityLevel: 1,
          maturityName: "DIRECT_LLM_INTERACTION",
        }),
      }),
    );

    const result = await sendDirectLlm("hello");
    expect(result.maturityLevel).toBe(1);
    expect(fetch).toHaveBeenCalledWith(
      "/api/llm",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "hello" }),
        signal: expect.any(Object),
      }),
    );
  });

  it("sendChat includes optional sessionId", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          sessionId: "sess-1",
          requestId: "req-1",
          response: "ok",
          events: [],
          maturityLevel: 2,
          maturityName: "PROXY_AGENT",
        }),
      }),
    );

    await sendChat("What is 15 * 23?", "sess-1");
    expect(fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "What is 15 * 23?", sessionId: "sess-1" }),
        signal: expect.any(Object),
      }),
    );
  });

  it("throws a friendly timeout error for stalled requests", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      }),
    );

    const request = expect(sendChat("stall")).rejects.toThrow(
      "Request timed out. Please try again.",
    );
    await vi.advanceTimersByTimeAsync(60_000);

    await request;
  });

  it("throws when response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => "server error",
      }),
    );

    await expect(sendChat("fail")).rejects.toThrow("server error");
  });
});

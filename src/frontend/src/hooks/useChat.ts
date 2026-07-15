import { useCallback, useState } from "react";
import { sendChat } from "../services/api";
import type { ChatResponse, DecisionEvent } from "../types/decision-event";

export function useChat() {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [events, setEvents] = useState<DecisionEvent[]>([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (message: string) => {
      setLoading(true);
      setError(null);
      try {
        const result: ChatResponse = await sendChat(message, sessionId);
        setSessionId(result.sessionId);
        setEvents(result.events);
        setResponse(result.response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [sessionId],
  );

  return { sessionId, events, response, loading, error, submit };
}

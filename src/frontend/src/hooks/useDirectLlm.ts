import { useCallback, useState } from "react";
import { sendDirectLlm } from "../services/api";

export function useDirectLlm() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (message: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendDirectLlm(message);
      setResponse(result.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, loading, error, submit };
}

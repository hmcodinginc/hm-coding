import { useState, useEffect } from "react";

export function useJsonData<T>(url: string, fallbackData: T) {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (!cancelled) {
          setData(json.record || json);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error("An error occurred"));
          console.warn("Failed to fetch JSON, using fallback data:", e);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

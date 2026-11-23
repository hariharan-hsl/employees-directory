import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

const useFetch = <T,>(url: string | null): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Data not found");
        }

        const result = (await response.json()) as T;
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

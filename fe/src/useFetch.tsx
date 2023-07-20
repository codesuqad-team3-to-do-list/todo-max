import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: any;
}

export default function useFetch<T>(
  url: string,
  options?: FetchOptions
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('fetch 요청이 실패했습니다.');
        }

        const jsonData = await response.json();

        setData(jsonData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
}

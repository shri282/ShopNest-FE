import { useState } from "react";

export default function useOnFetch<T>() {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFetch = async (callback: Promise<T>) => {
    setIsLoading(true);

    try {
      const data = await callback;
      setResult(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onFetch, result, error, isLoading };
}

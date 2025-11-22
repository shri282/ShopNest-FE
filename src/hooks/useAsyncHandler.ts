import { useCallback, useState } from "react";

export const useAsyncHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const run = useCallback(async <T>(asyncFn: () => Promise<T>) => {
    try {
      setLoading(true);
      const result = await asyncFn();
      setIsSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    isSuccess,
    run,
  };
};

import { useCallback, useEffect, useState } from "react";

type AnyFunc = (...args: any) => any;

export function useAsync<T extends AnyFunc>(fn: T, dependencies = []) {
  const { execute, ...state } = useAsyncInternal<T>(fn, dependencies, true);
  useEffect(() => {
    // @ts-ignore
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn<T extends AnyFunc>(fn: T, dependencies = []) {
  return useAsyncInternal<T>(fn, dependencies, false);
}

function useAsyncInternal<T extends AnyFunc>(
  fn: T,
  dependencies: any[],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<any>();
  const [resData, setResData] = useState<Awaited<ReturnType<T>>>();

  const execute: (...params: Parameters<T>) => ReturnType<T> = useCallback(
    (...params: Parameters<T>) => {
      setLoading(true);
      return fn(...params)
        .then((data: Awaited<ReturnType<T>>) => {
          setResData(data);
          setError(undefined);
          return data;
        })
        .catch((error: any) => {
          setError(error);
          setResData(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    dependencies
  );

  return { loading, error, resData, execute };
}

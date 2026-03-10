import { useState, useEffect, useCallback, useRef } from "react";
import { searchContent, type SearchResult } from "../lib/api";

// ─────────────────────────────────────────────────────────────
// GENERIC DATA FETCHING HOOK — Loading, error, refetch
// ─────────────────────────────────────────────────────────────

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: any[] = [],
  options?: { fallback?: T; enabled?: boolean }
): UseApiState<T> {
  const [data, setData] = useState<T | null>(options?.fallback || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    if (options?.enabled === false) {
      if (options.fallback !== undefined) {
        setData(options.fallback);
      }
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      if (isMounted.current) {
        setData(result);
        setIsLoading(false);
      }
    } catch (err: any) {
      if (options?.fallback) {
        // Non-fatal: static fallback is already in place
        console.warn("API unavailable, using static fallback:", err.message);
        if (isMounted.current) {
          setIsLoading(false);
          // Don't set error — fallback data is being served successfully
        }
      } else {
        console.error("API Error:", err);
        if (isMounted.current) {
          setError(err.message || "An unexpected error occurred");
          setIsLoading(false);
        }
      }
    }
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ─────────────────────────────────────────────────────────────
// MUTATION HOOK — For POST/PUT/DELETE with optimistic updates
// ─────────────────────────────────────────────────────────────

interface UseMutationState<T> {
  mutate: (input: any) => Promise<T>;
  data: T | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useMutation<T>(
  mutationFn: (input: any) => Promise<T>
): UseMutationState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (input: any): Promise<T> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(input);
        setData(result);
        setIsLoading(false);
        return result;
      } catch (err: any) {
        console.error("Mutation Error:", err);
        const errorMsg = err.body?.errors
          ? err.body.errors.join(", ")
          : err.message || "An unexpected error occurred";
        setError(errorMsg);
        setIsLoading(false);
        throw err;
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { mutate, data, isLoading, error, reset };
}

// ─────────────────────────────────────────────────────────────
// SEARCH HOOK — Debounced search with results
// ─────────────────────────────────────────────────────────────

interface UseSearchState {
  results: SearchResult[];
  isLoading: boolean;
  total: number;
}

export function useSearch(query: string, debounceMs = 250): UseSearchState {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setTotal(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchContent(query);
        setResults(data.results);
        setTotal(data.total);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, debounceMs]);

  return { results, isLoading, total };
}
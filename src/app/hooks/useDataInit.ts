import { useEffect, useRef } from "react";
import { seedDatabase } from "../lib/api";

/**
 * Calls seed endpoint once on app mount to ensure the KV store
 * has initial data. The endpoint is idempotent — if data exists
 * it returns immediately without modification.
 */
export function useDataInit() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    seedDatabase()
      .then((res) => {
        console.log("Data init:", res.message);
      })
      .catch((err) => {
        console.warn("Data seed failed (non-critical):", err.message);
      });
  }, []);
}

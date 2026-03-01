import { useEffect, useRef } from "react";
import { seedDatabase } from "../lib/api";

// ──────────────────────────────────────────────
// Auto-seeds the database on first mount.
// Idempotent — safe to call multiple times.
// ──────────────────────────────────────────────

export function useDataSeed(onSeeded?: () => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    seedDatabase()
      .then((result) => {
        console.log("Seed result:", result.message);
        onSeeded?.();
      })
      .catch((err) => {
        console.error("Seed error:", err);
        // Non-fatal — the seed might have already run
      });
  }, [onSeeded]);
}
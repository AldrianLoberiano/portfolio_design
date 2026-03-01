import { motion } from "motion/react";

export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl bg-white/5 aspect-[4/3]" />
      <div className="mt-5 space-y-2">
        <div className="flex gap-2">
          <div className="h-3 w-16 rounded-full bg-white/5" />
          <div className="h-3 w-10 rounded-full bg-white/5" />
        </div>
        <div className="h-5 w-40 rounded bg-white/5" />
        <div className="h-4 w-64 rounded bg-white/5" />
      </div>
    </div>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="animate-pulse pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-4 w-24 rounded bg-white/5 mb-10" />
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="h-6 w-20 rounded-full bg-white/5" />
            <div className="h-6 w-12 rounded bg-white/5" />
          </div>
          <div className="h-12 w-80 rounded bg-white/5" />
          <div className="h-5 w-96 rounded bg-white/5" />
        </div>
        <div className="mt-12 rounded-2xl bg-white/5 aspect-[16/9]" />
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-3 space-y-3">
            <div className="h-3 w-20 rounded bg-white/5" />
            <div className="flex gap-2">
              <div className="h-7 w-16 rounded-full bg-white/5" />
              <div className="h-7 w-20 rounded-full bg-white/5" />
            </div>
          </div>
          <div className="lg:col-span-9 space-y-16">
            <div className="space-y-3">
              <div className="h-3 w-16 rounded bg-white/5" />
              <div className="h-4 w-full rounded bg-white/5" />
              <div className="h-4 w-3/4 rounded bg-white/5" />
              <div className="h-4 w-5/6 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="animate-pulse p-7 rounded-2xl border border-white/5 bg-white/[0.02]">
      <div className="h-4 w-4 rounded bg-white/5 mb-4" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
        <div className="h-4 w-3/4 rounded bg-white/5" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/5" />
        <div className="space-y-1">
          <div className="h-3 w-24 rounded bg-white/5" />
          <div className="h-3 w-32 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="animate-pulse text-center">
      <div className="h-10 w-20 rounded bg-white/5 mx-auto mb-2" />
      <div className="h-3 w-28 rounded bg-white/5 mx-auto" />
    </div>
  );
}

export function PageLoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
        <p
          className="text-white/30"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
        >
          Loading...
        </p>
      </div>
    </motion.div>
  );
}
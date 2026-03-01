import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, FileText, Briefcase, MessageSquare } from "lucide-react";
import { useSearch } from "../../hooks/useApi";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  project: <Briefcase size={16} />,
  testimonial: <MessageSquare size={16} />,
  page: <FileText size={16} />,
};

const typeLabels: Record<string, string> = {
  project: "Project",
  testimonial: "Testimonial",
  page: "Page",
};

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { results, isLoading, total } = useSearch(query);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // We can't open from here, parent handles it
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex].url);
      onClose();
    }
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-xl mx-auto px-4"
          >
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search size={18} className="text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, pages..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                />
                <button
                  onClick={onClose}
                  className="flex-shrink-0 px-2 py-1 rounded-md bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[320px] overflow-y-auto">
                {isLoading && query.length >= 2 && (
                  <div className="px-5 py-8 text-center">
                    <div className="w-5 h-5 border-2 border-white/10 border-t-white/50 rounded-full animate-spin mx-auto" />
                  </div>
                )}

                {!isLoading && query.length >= 2 && results.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p
                      className="text-white/30"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                    >
                      No results found for "{query}"
                    </p>
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleResultClick(result.url)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                          selectedIndex === index ? "bg-white/5" : ""
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 flex-shrink-0">
                          {typeIcons[result.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-white truncate"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            {result.title}
                          </p>
                          {result.subtitle && (
                            <p
                              className="text-white/30 truncate"
                              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                            >
                              {result.subtitle}
                            </p>
                          )}
                        </div>
                        <span
                          className="text-white/20 flex-shrink-0"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}
                        >
                          {typeLabels[result.type]}
                        </span>
                        {selectedIndex === index && (
                          <ArrowRight size={14} className="text-white/30 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {query.length < 2 && (
                  <div className="px-5 py-6">
                    <p
                      className="text-white/20 text-center"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                    >
                      Type at least 2 characters to search
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {["React", "Brand", "Mobile", "Dashboard"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-white/20" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">&uarr;</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">&darr;</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1 text-white/20" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">&crarr;</kbd>
                    select
                  </span>
                </div>
                {total > 0 && (
                  <span className="text-white/20" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}>
                    {total} result{total !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

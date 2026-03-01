import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, FileText, Quote } from "lucide-react";
import { searchContent, type SearchResult } from "../../lib/api";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut to open (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        // The parent should handle open
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Debounced search
  const performSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchContent(q);
      setResults(data.results);
      setSelectedIndex(0);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(value), 250);
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[61] w-[90vw] max-w-xl"
          >
            <div className="bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search size={18} className="text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, skills, content..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                />
                <button
                  onClick={onClose}
                  className="flex-shrink-0 px-2 py-1 rounded-md bg-white/5 text-white/40"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto">
                {isSearching && (
                  <div className="px-5 py-8 text-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto" />
                  </div>
                )}

                {!isSearching && query.length >= 2 && results.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="text-white/30" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>
                      No results found for "{query}"
                    </p>
                  </div>
                )}

                {!isSearching && results.length > 0 && (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 px-5 py-3 transition-colors duration-150 text-left ${
                          index === selectedIndex
                            ? "bg-white/5"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        {/* Icon or Thumbnail */}
                        {result.thumbnail ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                            <ImageWithFallback
                              src={result.thumbnail}
                              alt={result.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            {result.type === "project" ? (
                              <FileText size={16} className="text-white/30" />
                            ) : (
                              <Quote size={16} className="text-white/30" />
                            )}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p
                            className="text-white truncate"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            {result.title}
                          </p>
                          <p
                            className="text-white/30 truncate"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                          >
                            {result.category} — {result.subtitle}
                          </p>
                        </div>

                        {index === selectedIndex && (
                          <ArrowRight size={14} className="text-white/30 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {query.length < 2 && (
                  <div className="px-5 py-6 text-center">
                    <p className="text-white/20" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                      Type at least 2 characters to search
                    </p>
                  </div>
                )}
              </div>

              {/* Footer hints */}
              <div className="px-5 py-3 border-t border-white/5 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/30" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem" }}>
                    ↑↓
                  </kbd>
                  <span className="text-white/20" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}>navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/30" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem" }}>
                    ↵
                  </kbd>
                  <span className="text-white/20" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem" }}>select</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

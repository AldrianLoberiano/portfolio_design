import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  Mail,
  Eye,
  Folder,
  Clock,
  CheckCircle,
  MessageSquare,
  Archive,
  RefreshCw,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getAnalytics, getContactSubmissions, updateContactStatus, type ContactSubmission } from "../lib/api";
import { PageLoadingSpinner } from "../components/shared/LoadingSkeleton";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  read: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  replied: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  archived: "bg-white/5 text-white/40 border-white/10",
};

const statusIcons: Record<string, React.ReactNode> = {
  new: <Mail size={12} />,
  read: <Eye size={12} />,
  replied: <CheckCircle size={12} />,
  archived: <Archive size={12} />,
};

export function Admin() {
  const [activeTab, setActiveTab] = useState<"overview" | "submissions">("overview");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const {
    data: analytics,
    isLoading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useApi(() => getAnalytics(), []);

  const {
    data: submissionsData,
    isLoading: submissionsLoading,
    refetch: refetchSubmissions,
  } = useApi(
    () => getContactSubmissions(statusFilter),
    [statusFilter]
  );

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateContactStatus(id, newStatus);
      refetchSubmissions();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between"
        >
          <div>
            <p
              className="text-white/40 uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
            >
              Admin Dashboard
            </p>
            <h1
              className="text-white tracking-[-0.03em]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Content Manager
            </h1>
          </div>
          <button
            onClick={() => {
              refetchAnalytics();
              refetchSubmissions();
            }}
            className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <RefreshCw size={16} />
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex gap-2"
        >
          {(["overview", "submissions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 capitalize ${
                activeTab === tab
                  ? "bg-white text-[#0a0a0a] border-white"
                  : "bg-transparent text-white/50 border-white/10 hover:border-white/20"
              }`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            {analyticsLoading ? (
              <PageLoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Folder size={18} className="text-purple-400" />
                    </div>
                    <span className="text-white/40" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                      Projects
                    </span>
                  </div>
                  <p
                    className="text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 700 }}
                  >
                    {analytics?.totalProjects || 0}
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Eye size={18} className="text-blue-400" />
                    </div>
                    <span className="text-white/40" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                      Total Views
                    </span>
                  </div>
                  <p
                    className="text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 700 }}
                  >
                    {analytics?.totalViews || 0}
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <MessageSquare size={18} className="text-emerald-400" />
                    </div>
                    <span className="text-white/40" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                      Submissions
                    </span>
                  </div>
                  <p
                    className="text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2rem", fontWeight: 700 }}
                  >
                    {analytics?.totalSubmissions || 0}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setStatusFilter(undefined)}
                className={`px-4 py-1.5 rounded-full border text-xs transition-all duration-300 ${
                  !statusFilter
                    ? "bg-white text-[#0a0a0a] border-white"
                    : "text-white/40 border-white/10 hover:border-white/20"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                All ({submissionsData?.total || 0})
              </button>
              {["new", "read", "replied", "archived"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-full border text-xs transition-all duration-300 capitalize ${
                    statusFilter === status
                      ? "bg-white text-[#0a0a0a] border-white"
                      : "text-white/40 border-white/10 hover:border-white/20"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {status} ({submissionsData?.statusCounts?.[status] || 0})
                </button>
              ))}
            </div>

            {submissionsLoading ? (
              <PageLoadingSpinner />
            ) : submissionsData?.submissions?.length ? (
              <div className="space-y-4">
                {submissionsData.submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className="text-white"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
                          >
                            {sub.name}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs ${statusColors[sub.status]}`}
                          >
                            {statusIcons[sub.status]}
                            {sub.status}
                          </span>
                        </div>
                        <p className="text-white/40" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                          {sub.email}
                          {sub.company && ` — ${sub.company}`}
                          {sub.budget && ` — ${sub.budget}`}
                          {sub.service && ` — ${sub.service}`}
                        </p>
                        <p
                          className="mt-3 text-white/60"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}
                        >
                          {sub.message}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-white/20">
                          <Clock size={12} />
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>
                            {new Date(sub.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Status Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        {sub.status !== "read" && (
                          <button
                            onClick={() => handleStatusChange(sub.id, "read")}
                            className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Mark Read
                          </button>
                        )}
                        {sub.status !== "replied" && (
                          <button
                            onClick={() => handleStatusChange(sub.id, "replied")}
                            className="px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400/60 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Replied
                          </button>
                        )}
                        {sub.status !== "archived" && (
                          <button
                            onClick={() => handleStatusChange(sub.id, "archived")}
                            className="px-3 py-1.5 rounded-lg border border-white/10 text-white/30 hover:text-white/50 hover:border-white/15 transition-all text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Archive
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Mail size={32} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/30" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}>
                  No submissions yet
                </p>
                <p className="text-white/20 mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                  Contact form submissions will appear here
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

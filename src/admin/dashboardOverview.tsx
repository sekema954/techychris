import useFetchBlogs from "../api/fetchblogs";
import { useFetchSubscribers } from "../api/useFetchSubscribers";
import { useFetchCourses } from "../api/fetchcourses";
import { useState } from "react";
import PatchNotesPopup from "../components/patchPopup";
import {
  FileText,
  Users,
  BookOpen,
  PlusCircle,
  ShoppingBag,
  Eye,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  intro: string;
}

interface DashboardOverviewProps {
  blogs: Blog[];
  subscribersCount: number;
  onAddBlog: () => void;
  onAddProduct: () => void;
  onViewSubscribers: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onAddBlog,
  onAddProduct,
  onViewSubscribers,
}) => {
  const { blogs } = useFetchBlogs();
  const { subscribers, isLoading: subsLoading } = useFetchSubscribers();
  const { courses } = useFetchCourses();
  const [showPatchNotes, setShowPatchNotes] = useState(true);

  const patches = [
    "Improved UI design on components",
    "Fixed admin panel login/register",
  ];

  const stats = [
    {
      label: "Total Blogs",
      value: blogs.length,
      loading: blogs.length === 0,
      icon: <FileText size={18} className="text-blue-400" />,
      color: "blue",
      trend: "+2 this week",
    },
    {
      label: "Subscribers",
      value: subscribers.length,
      loading: subsLoading,
      icon: <Users size={18} className="text-emerald-400" />,
      color: "emerald",
      trend: "Active members",
    },
    {
      label: "Courses",
      value: courses.length,
      loading: courses.length <= 0,
      icon: <BookOpen size={18} className="text-violet-400" />,
      color: "violet",
      trend: "Published",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  };

  const glowMap: Record<string, string> = {
    blue: "rgba(59,130,246,0.08)",
    emerald: "rgba(16,185,129,0.08)",
    violet: "rgba(139,92,246,0.08)",
  };

  const quickActions = [
    { label: "Add Blog", icon: <PlusCircle size={15} />, onClick: onAddBlog, color: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/30" },
    { label: "Add Product", icon: <ShoppingBag size={15} />, onClick: onAddProduct, color: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30" },
    { label: "View Subscribers", icon: <Eye size={15} />, onClick: onViewSubscribers, color: "bg-violet-600 hover:bg-violet-500 shadow-violet-900/30" },
  ];

  return (
    <>
      <PatchNotesPopup
        isOpen={showPatchNotes}
        onClose={() => setShowPatchNotes(false)}
        patches={patches}
      />

      <div className="space-y-8">
        {/* Page header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Overview</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back — here's what's happening.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-white/[0.03] border border-white/8 hover:border-white/15 rounded-2xl p-5 transition-all duration-200 overflow-hidden group"
              style={{ background: `radial-gradient(circle at top right, ${glowMap[stat.color]}, transparent 60%)` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorMap[stat.color]}`}>
                  {stat.icon}
                </div>
              </div>

              {stat.loading ? (
                <div className="h-9 w-16 bg-white/10 animate-pulse rounded-lg mb-1" />
              ) : (
                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
              )}

              <p className="text-sm text-white/50 mt-0.5">{stat.label}</p>
              <p className="text-xs text-white/25 mt-3 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${colorMap[stat.color].split(" ")[2].replace("text-", "bg-")}`} />
                {stat.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Blogs */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <h2 className="font-semibold text-sm text-white/80">Recent Posts</h2>
            <button
              onClick={onAddBlog}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={11} />
            </button>
          </div>

          {blogs.length === 0 ? (
            <div className="px-5 py-8 text-center text-white/30 text-sm">
              No blogs yet.
            </div>
          ) : (
            <ul className="divide-y divide-white/5 max-h-60 overflow-y-auto">
              {blogs.slice(0, 5).map((blog) => (
                <li
                  key={blog._id}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText size={12} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{blog.title}</p>
                    <p className="text-xs text-white/35 truncate mt-0.5">{blog.intro}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">Quick Actions</h2>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-5 py-2.5 ${action.color} text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
import { motion } from "framer-motion";
import { X, Eye, MousePointerClick, Globe, Clock, TrendingUp, Activity, Calendar, Zap } from "lucide-react";
import { getFullAnalytics } from "@/lib/analytics";

const InsightsLabModal = ({ onClose }: { onClose: () => void }) => {
  const a = getFullAnalytics();

  const statCards = [
    { label: "Total Page Views", value: a.totalPageViews, icon: Eye, color: "from-blue-500/20 to-cyan-500/20" },
    { label: "Section Views", value: a.totalSectionViews, icon: Activity, color: "from-emerald-500/20 to-teal-500/20" },
    { label: "Total Clicks", value: a.totalClicks, icon: MousePointerClick, color: "from-purple-500/20 to-pink-500/20" },
    { label: "Unique Sessions", value: a.uniqueSessions, icon: Globe, color: "from-orange-500/20 to-amber-500/20" },
    { label: "Avg Actions/Session", value: a.avgActionsPerSession, icon: TrendingUp, color: "from-red-500/20 to-rose-500/20" },
    { label: "Peak Activity", value: a.peakHour, icon: Clock, color: "from-indigo-500/20 to-violet-500/20" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[85vh] glass rounded-3xl border border-white/10 overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-semibold">Portfolio Analytics</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tracking since {a.firstVisit} · Last visit {a.lastVisit}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition"><X size={20} /></button>
        </div>

        {/* Stat Cards */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {statCards.map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-5 border border-white/5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Top Sections */}
        <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold">Most Visited Sections</h4>
            </div>
            <div className="space-y-3">
              {a.topSections.length > 0 ? a.topSections.map(([name, count], i) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-sm">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full bg-primary/20 w-16">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (count / (a.topSections[0]?.[1] || 1)) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              )) : <p className="text-xs text-muted-foreground/50">No data yet</p>}
            </div>
          </div>

          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <MousePointerClick className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold">Most Clicked Elements</h4>
            </div>
            <div className="space-y-3">
              {a.topClicks.length > 0 ? a.topClicks.map(([name, count], i) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-sm">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full bg-accent/20 w-16">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, (count / (a.topClicks[0]?.[1] || 1)) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              )) : <p className="text-xs text-muted-foreground/50">No data yet</p>}
            </div>
          </div>
        </div>

        {/* Daily Views Chart */}
        {a.viewsByDay.length > 0 && (
          <div className="px-6 pb-6">
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold">Daily Page Views (Last 14 days)</h4>
              </div>
              <div className="flex items-end gap-1 h-24">
                {a.viewsByDay.map(([day, count]) => {
                  const maxCount = Math.max(...a.viewsByDay.map(d => d[1] as number));
                  const height = maxCount > 0 ? ((count as number) / maxCount) * 100 : 0;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] text-muted-foreground">{count}</span>
                      <div className="w-full bg-primary/20 rounded-t-sm relative" style={{ height: `${Math.max(4, height)}%` }}>
                        <div className="absolute inset-0 bg-primary rounded-t-sm" />
                      </div>
                      <span className="text-[7px] text-muted-foreground/50 rotate-[-45deg] whitespace-nowrap">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InsightsLabModal;

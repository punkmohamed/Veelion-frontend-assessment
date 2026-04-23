"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CheckCircle2,
  CircleDashed,
  LayoutDashboard,
  ListTodo,
  Loader2,
  PlayCircle,
  RefreshCw,
} from "lucide-react";
import useTasksSummary from "@/hooks/useTasksSummary";
import { BackNav } from "@/components/BackNav";

const STATUS_COLORS: Record<string, string> = {
  Todo: "#5a8f96",
  "In progress": "#145e63",
  Done: "#1b6f5c",
};

export default function TasksSummaryPage() {
  const { summary, loading, error, refetch } = useTasksSummary();

  const pieData =
    summary != null
      ? [
          { name: "Todo", value: summary.byStatus.todo },
          { name: "In progress", value: summary.byStatus["in-progress"] },
          { name: "Done", value: summary.byStatus.done },
        ]
      : [];

  const barData = pieData.map((row) => ({
    ...row,
    fill: STATUS_COLORS[row.name] ?? "#8a949e",
  }));

  return (
    <main className="page-main stack stack-loose">
      <BackNav />

      <header className="page-hero card">
        <div className="page-hero-icon" aria-hidden>
          <LayoutDashboard size={26} strokeWidth={1.75} />
        </div>
        <div className="page-hero-text">
          <h1 className="page-title">Reports</h1>
          <p className="page-lead muted-text">
            Task volume and status mix at a glance, powered by your backend summary.
          </p>
        </div>
        <button
          type="button"
          className="button button-ghost page-hero-refresh"
          onClick={() => refetch()}
          disabled={loading}
          aria-label="Refresh summary"
        >
          <RefreshCw size={18} className={loading ? "icon-spin" : ""} aria-hidden />
          Refresh
        </button>
      </header>

      {loading ? (
        <section className="card section-padding loading-inline" role="status">
          <Loader2 className="icon-spin" size={28} aria-hidden />
          <span>Loading summary…</span>
        </section>
      ) : null}

      {error ? (
        <section className="card section-padding alert alert-error" role="alert">
          <p className="alert-message">{error}</p>
          <button type="button" className="button primary" onClick={() => refetch()}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error && summary ? (
        <>
          <div className="reports-kpi-grid">
            <div className="card reports-kpi">
              <span className="reports-kpi-label">Total tasks</span>
              <span className="reports-kpi-value">{summary.total}</span>
              <span className="reports-kpi-hint">Across all statuses</span>
            </div>
            <div className="card reports-kpi">
              <span className="reports-kpi-label">Recent activity</span>
              <span className="reports-kpi-value">{summary.recentActivityCount}</span>
              <span className="reports-kpi-hint">Events in the reporting window</span>
            </div>
            <div className="card reports-kpi">
              <span className="reports-kpi-label">Completion rate</span>
              <span className="reports-kpi-value">
                {summary.total > 0
                  ? `${Math.round((summary.byStatus.done / summary.total) * 100)}%`
                  : "—"}
              </span>
              <span className="reports-kpi-hint">Done ÷ total</span>
            </div>
          </div>

          <section className="card section-padding">
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BarChart3 size={22} strokeWidth={1.75} aria-hidden />
              Status breakdown
            </h2>
            <div className="reports-charts">
              <div className="card reports-chart-card">
                <h3 className="reports-chart-title">Share by status</h3>
                <div className="reports-chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={56}
                        outerRadius={88}
                        paddingAngle={2}
                      >
                        {pieData.map((entry) => (
                          <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#94a3b8"} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={28} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card reports-chart-card">
                <h3 className="reports-chart-title">Count by status</h3>
                <div className="reports-chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={92}
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                        {barData.map((row) => (
                          <Cell key={row.name} fill={row.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          <section className="card section-padding">
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ListTodo size={22} strokeWidth={1.75} aria-hidden />
              Numbers
            </h2>
            <div className="summary-item">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
                <CircleDashed size={16} aria-hidden />
                Todo
              </span>
              <span>{summary.byStatus.todo}</span>
            </div>
            <div className="summary-item">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
                <PlayCircle size={16} aria-hidden />
                In progress
              </span>
              <span>{summary.byStatus["in-progress"]}</span>
            </div>
            <div className="summary-item">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
                <CheckCircle2 size={16} aria-hidden />
                Done
              </span>
              <span>{summary.byStatus.done}</span>
            </div>
          </section>

          <p className="muted-text" style={{ margin: 0, fontSize: "0.88rem" }}>
            Need the raw feed?{" "}
            <Link href="/activity" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Open activity
            </Link>
            .
          </p>
        </>
      ) : null}
    </main>
  );
}

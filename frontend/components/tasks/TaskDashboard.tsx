"use client";

import { LayoutList, Loader2, RefreshCw } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <section className="stack stack-loose">
      <header className="card section-padding" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <span
            className="page-hero-icon"
            style={{ width: 48, height: 48 }}
            aria-hidden
          >
            <LayoutList size={24} strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="page-title" style={{ fontSize: "1.45rem" }}>
              Task dashboard
            </h1>
            <p className="muted-text" style={{ margin: "0.2rem 0 0", fontSize: "0.9rem" }}>
              Pulls from <code style={{ fontSize: "0.85em" }}>/api/tasks</code>
            </p>
          </div>
        </div>
        <button
          type="button"
          className="button button-ghost"
          onClick={() => fetchTasks()}
          disabled={loading}
          aria-label="Reload tasks"
        >
          <RefreshCw size={18} className={loading ? "icon-spin" : ""} aria-hidden />
          Reload
        </button>
      </header>

      <StatusFilter value={filter} onChange={setFilter} />

      {loading ? (
        <section className="card section-padding loading-inline" role="status">
          <Loader2 className="icon-spin" size={26} aria-hidden />
          <span>Loading tasks…</span>
        </section>
      ) : null}

      {error ? (
        <section className="card section-padding alert alert-error">
          <p className="alert-message">{error}</p>
          <button type="button" className="button primary" onClick={fetchTasks}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <TaskList tasks={filteredTasks} updatingTaskId={updatingTaskId} onToggle={handleToggle} />
      ) : null}
    </section>
  );
}

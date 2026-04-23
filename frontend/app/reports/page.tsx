"use client";

import useTasksSummary from '../../hooks/useTasksSummary';

export default function TasksSummaryPage() {
  const { summary, loading, error } = useTasksSummary();

  return (
    <main className="stack">
      <nav>
        <a href="/" className="button">Back</a>
      </nav>

      <section className="card section-padding">
        <h1 className="section-title">Tasks Summary</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {summary && (
          <div>
            <p>Total tasks: {summary.total}</p>
            <p>Recent activity count: {summary.recentActivityCount}</p>
            <div className="summary-item">
              <span>Todo</span>
              <span>{summary.byStatus.todo}</span>
            </div>
            <div className="summary-item">
              <span>In‑Progress</span>
              <span>{summary.byStatus["in-progress"]}</span>
            </div>
            <div className="summary-item">
              <span>Done</span>
              <span>{summary.byStatus.done}</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

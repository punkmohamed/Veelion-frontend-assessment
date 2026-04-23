'use client';

import { useState } from 'react';
import { Activity, Loader2, RefreshCw, Search } from 'lucide-react';
import { useActivity } from '@/hooks/useActivity';
import ActivityList from '@/components/activity/ActivityList';
import { BackNav } from '@/components/BackNav';

export default function ActivityPage() {
  const [query, setQuery] = useState('');
  const { activities, totalCount, visibleCount, loading, error, refetch } = useActivity(query);

  return (
    <main className="page-main stack stack-loose">
      <BackNav />

      <header className="page-hero card">
        <div className="page-hero-icon" aria-hidden>
          <Activity size={28} strokeWidth={1.75} />
        </div>
        <div className="page-hero-text">
          <h1 className="page-title">Activity</h1>
          <p className="page-lead muted-text">
            A live stream of changes and events from your tasks workspace.
          </p>
        </div>
        <button
          type="button"
          className="button button-ghost page-hero-refresh"
          onClick={() => refetch()}
          disabled={loading}
          aria-label="Refresh activity"
        >
          <RefreshCw size={18} className={loading ? 'icon-spin' : ''} aria-hidden />
          Refresh
        </button>
      </header>

      <section className="card section-padding activity-toolbar">
        <label className="input-label" htmlFor="activity-search">
          Find events
        </label>
        <div className="input-with-icon">
          <Search className="input-with-icon-leading" size={18} aria-hidden />
          <input
            id="activity-search"
            className="input input-padded-left"
            placeholder="Search the feed…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </section>

      <div className="stat-row">
        <div className="stat-tile card">
          <span className="stat-tile-label">Total events</span>
          <span className="stat-tile-value">{loading ? '—' : totalCount}</span>
        </div>
        <div className="stat-tile card">
          <span className="stat-tile-label">Showing</span>
          <span className="stat-tile-value">{loading ? '—' : visibleCount}</span>
        </div>
      </div>

      {error ? (
        <section className="card section-padding alert alert-error" role="alert">
          <p className="alert-message">{error}</p>
          <button type="button" className="button primary" onClick={() => refetch()}>
            Retry
          </button>
        </section>
      ) : null}

      <section className="card section-padding activity-feed-card">
        {loading ? (
          <div className="loading-inline" role="status" aria-live="polite">
            <Loader2 className="icon-spin" size={28} aria-hidden />
            <span>Loading activity…</span>
          </div>
        ) : (
          <ActivityList activities={activities} hasQuery={Boolean(query.trim())} />
        )}
      </section>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useActivity } from '@/hooks/useActivity';
import ActivityList from '@/components/activity/ActivityList';

export default function ActivityPage() {
  const [query, setQuery] = useState('');
  const { activities, totalCount, visibleCount } = useActivity(query);

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card section-padding">
        <h1 className="section-title">Activity Feed</h1>

        <input
          className="input"
          placeholder="Search activity"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="card section-padding">
        <small className="muted-text">
          Total: {totalCount} | Visible: {visibleCount}
        </small>
      </section>

      <section className="card section-padding">
        <ActivityList activities={activities} />
      </section>
    </main>
  );
}
import { useEffect, useState, useMemo, useCallback } from 'react';
import type { ActivityLog } from '@/types/api';

export function useActivity(query: string) {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch('/api/activity')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load activity');
        return response.json();
      })
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
      })
      .catch(() => {
        setAllActivity([]);
        setError('Could not load activity. Try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filteredActivity = useMemo(() => {
    if (!query.trim()) return allActivity;
    const lower = query.toLowerCase();
    return allActivity.filter(
      (item) =>
        (item.action || '').toLowerCase().includes(lower) ||
        (item.info || '').toLowerCase().includes(lower)
    );
  }, [allActivity, query]);

  return {
    activities: filteredActivity,
    totalCount: allActivity.length,
    visibleCount: filteredActivity.length,
    loading,
    error,
    refetch,
  };
}
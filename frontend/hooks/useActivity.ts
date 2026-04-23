import { useEffect, useState, useMemo } from 'react';
import type { ActivityLog } from '@/types/api';

export function useActivity(query: string) {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);

  useEffect(() => {
    fetch('/api/activity')
      .then((response) => response.json())
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
      })
      .catch(() => {
        setAllActivity([]);
      });
  }, []);

  const activeFilter = (item: ActivityLog) => {
    if (!query) return true;
    const lower = query.toLowerCase();
    return (
      (item.action || '').toLowerCase().includes(lower) ||
      (item.info || '').toLowerCase().includes(lower)
    );
  };

  const filteredActivity = useMemo(() => {
    return allActivity.filter(activeFilter);
  }, [allActivity, query]);

  return {
    activities: filteredActivity,
    totalCount: allActivity.length,
    visibleCount: filteredActivity.length,
  };
}
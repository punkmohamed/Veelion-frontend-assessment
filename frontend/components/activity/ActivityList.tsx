import React from 'react';
import { Inbox, Search } from 'lucide-react';
import ActivityItem from './ActivityItem';
import type { ActivityLog } from '@/types/api';

interface ActivityListProps {
  activities: ActivityLog[];
  hasQuery: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, hasQuery }) => {
  if (activities.length === 0) {
    const Icon = hasQuery ? Search : Inbox;
    const title = hasQuery ? 'No matches' : 'Nothing here yet';
    const subtitle = hasQuery
      ? 'Try a different search term.'
      : 'Activity from your workspace will show up here.';

    return (
      <div className="empty-state" role="status">
        <div className="empty-state-icon">
          <Icon size={40} strokeWidth={1.5} aria-hidden />
        </div>
        <p className="empty-state-title">{title}</p>
        <p className="empty-state-subtitle">{subtitle}</p>
      </div>
    );
  }

  return (
    <ul className="activity-list">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
};

export default ActivityList;

import React from 'react';
import ActivityItem from './ActivityItem';
import type { ActivityLog } from '@/types/api';

interface ActivityListProps {
  activities: ActivityLog[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <ul className="activity-list">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
};

export default ActivityList;
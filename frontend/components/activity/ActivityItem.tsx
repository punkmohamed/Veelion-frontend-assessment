import type { ActivityLog } from '@/types/api';
import { formatTime } from '@/utils/format';
import { iconForActivityAction } from './activityIcons';

interface ActivityItemProps {
  activity: ActivityLog;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const Icon = iconForActivityAction(activity.action);

  return (
    <li className="activity-item">
      <div className="activity-item-marker" aria-hidden>
        <Icon size={20} strokeWidth={1.85} className="activity-item-icon" />
      </div>
      <div className="activity-item-body">
        <div className="activity-item-action">{activity.action || '(no action)'}</div>
        <div className="activity-item-info">{activity.info || '(no info)'}</div>
        <time className="activity-item-time" dateTime={activity.when}>
          {formatTime(activity.when)}
        </time>
      </div>
    </li>
  );
};

export default ActivityItem;

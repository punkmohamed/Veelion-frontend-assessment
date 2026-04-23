import type { ActivityLog } from '@/types/api';
import { formatActivityWhen, getActivityEventLabel } from '@/utils/activityDisplay';
import { iconForActivityAction } from './activityIcons';

interface ActivityItemProps {
  activity: ActivityLog;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const Icon = iconForActivityAction(activity.action);
  const label = getActivityEventLabel(activity);

  return (
    <li className="activity-item">
      <div className="activity-item-marker" aria-hidden>
        <Icon size={20} strokeWidth={1.85} className="activity-item-icon" />
      </div>
      <div className="activity-item-body">
        <p className="activity-item-label">{label}</p>
        <time className="activity-item-time" dateTime={activity.when}>
          {formatActivityWhen(activity.when)}
        </time>
      </div>
    </li>
  );
};

export default ActivityItem;

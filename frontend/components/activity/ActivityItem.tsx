import type { ActivityLog } from '@/types/api';
import { formatTime } from '@/utils/format';

interface ActivityItemProps {
  activity: ActivityLog;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  return (
    <li className="activity-item">
      <div className="activity-item-action">{activity.action || '(no action)'}</div>
      <div>{activity.info || '(no info)'}</div>
      <small className="activity-item-time">
        {formatTime(activity.when)}
      </small>
    </li>
  );
};

export default ActivityItem;
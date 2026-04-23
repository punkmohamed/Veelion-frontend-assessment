import type { ActivityLog } from '@/types/api';

function prettify(value: string | undefined): string {
  const s = (value ?? '').trim();
  if (!s) return '';
  const spaced = s.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function getActivityEventLabel(activity: ActivityLog): string {
  const action = prettify(activity.action);
  const info = prettify(activity.info);
  if (action && info) {
    if (action.toLowerCase() === info.toLowerCase()) return action;
    return `${action} · ${info}`;
  }
  if (action) return action;
  if (info) return info;
  return 'Workspace event';
}

export function formatActivityWhen(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

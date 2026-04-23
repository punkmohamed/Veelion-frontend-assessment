import { ActivityLog } from "@/types/api";


export function activeFilter(items: ActivityLog[], query: string): ActivityLog[] {
  if (!query) return items;
  const lower = query.toLowerCase();
  return items.filter((item) => (
    (item.action || '').toLowerCase().includes(lower) ||
    (item.info || '').toLowerCase().includes(lower)
  ));
}
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CheckCircle2,
  Pencil,
  PlusCircle,
  Trash2,
  ClipboardList,
} from "lucide-react";

export function iconForActivityAction(action?: string): LucideIcon {
  const a = (action || "").toLowerCase();
  if (/(creat|add|new|insert)/.test(a)) return PlusCircle;
  if (/(delet|remov|destroy)/.test(a)) return Trash2;
  if (/(complet|done|finish|clos)/.test(a)) return CheckCircle2;
  if (/(updat|edit|modif|chang|patch)/.test(a)) return Pencil;
  if (/(assign|status|move)/.test(a)) return ClipboardList;
  return Activity;
}

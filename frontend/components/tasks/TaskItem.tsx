import type { Task } from "@/types/api";
import { formatTime } from "@/utils/format";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
};

export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
  const StatusIcon = task.completed ? CheckCircle2 : Circle;

  return (
    <li className="card task-item">
      <div className="task-item-header">
        <p className="task-item-title">{task.title}</p>
        <span className="badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
          <StatusIcon size={14} aria-hidden />
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <small className="task-item-updated">Updated: {formatTime(task.updatedAt)}</small>

      <div className="task-item-actions">
        <button
          type="button"
          className="button primary"
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {busy ? (
            <>
              <Loader2 className="icon-spin" size={16} aria-hidden />
              Saving…
            </>
          ) : task.completed ? (
            "Mark as pending"
          ) : (
            "Mark as completed"
          )}
        </button>
      </div>
    </li>
  );
}

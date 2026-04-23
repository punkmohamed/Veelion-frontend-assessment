import { TaskDashboard } from "@/components/tasks/TaskDashboard";
import { BackNav } from "@/components/BackNav";

export default function TasksPage() {
  return (
    <main className="page-main stack stack-loose">
      <BackNav />
      <TaskDashboard />
    </main>
  );
}

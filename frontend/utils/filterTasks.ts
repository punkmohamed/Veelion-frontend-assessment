import type { Task, TaskFilter } from '@/types/api';

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }
  if (filter === 'pending') {
    return tasks.filter((task) => !task.completed);
  }
  return tasks;
}

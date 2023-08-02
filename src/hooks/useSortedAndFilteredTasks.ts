import { useMemo } from 'react';

export interface Task {
  id: string;
  name: string;
  status: "created" | "started" | "ended";
  created: Date;
  start?: Date;
  end?: Date;
  duration?: number;  // in milliseconds
}

export const useSortedTasks = (tasks: Task[], sortBy: 'created' | 'start' | 'end', status?: Task['status']): Task[] => {
  return useMemo(() => {
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
    return filteredTasks.sort((a, b) => {
      const aTime = a[sortBy]?.getTime() || Infinity;
      const bTime = b[sortBy]?.getTime() || Infinity;
      return bTime - aTime;
    });
  }, [tasks, sortBy, status]);
};


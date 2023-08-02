import { useMemo } from 'react';
// models
import { Task } from "../models/Task"

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


import { useMemo } from 'react';
// models
import { Task } from "../models/Task"

export const useSortedTasks = (tasks: Task[], sortBy: 'created' | 'start' | 'end', status?: Task['status'] | 'active'): Task[] => {
  return useMemo(() => {
    let filteredTasks;
    
    if (status === 'active') {
      filteredTasks = tasks.filter(task => task.status === 'started' || task.status === 'paused');
    } else if (status) {
      filteredTasks = tasks.filter(task => task.status === status);
    } else {
      filteredTasks = tasks;
    }

    return filteredTasks.sort((a, b) => {
      const aTime = a[sortBy]?.getTime() || Infinity;
      const bTime = b[sortBy]?.getTime() || Infinity;
      return bTime - aTime;
    });
  }, [tasks, sortBy, status]);
};


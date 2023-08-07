import { Task } from "../models/Task"
import { TaskCountData, TaskTimeData } from "../models/Chart"

const getPastSevenDays = (): string[] => {
  const dates: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
  }

  return dates;
}

export const generateBarChartData = (tasks: Task[]): TaskCountData[] => {
  const taskSummary: { [date: string]: number } = {};

  tasks.forEach(task => {
    if (task.status === "ended" && task.end) {
      const endDate = task.end.toLocaleDateString();

      if (endDate in taskSummary) {
        taskSummary[endDate]++;
      } else {
        taskSummary[endDate] = 1;
      }
    }
  });

  const lastSevenDays = getPastSevenDays();

  return lastSevenDays.map((date) => ({
    date,
    完了タスク: taskSummary[date] || 0,
  }));
}

export const generateDurationBarChartData = (tasks: Task[]): TaskTimeData[] => {
  const durationSummary: { [date: string]: number } = {};

  tasks.forEach(task => {
    if (task.status === "ended" && task.end && task.duration) {
      const endDate = task.end.toLocaleDateString();

      if (endDate in durationSummary) {
        durationSummary[endDate] += task.duration;
      } else {
        durationSummary[endDate] = task.duration;
      }
    }
  });

  const lastSevenDays = getPastSevenDays();

  return lastSevenDays.map((date) => ({
    date,
    経過時間: durationSummary[date] || 0,
  }));
}
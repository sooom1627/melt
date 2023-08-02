import { Task } from "../models/Task"
import { BarChartData } from "../models/Chart"

const getPastSevenDays = (): string[] => {
  const dates: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
  }

  return dates;
}

export const generateBarChartData = (tasks: Task[]): BarChartData[] => {
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

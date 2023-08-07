export interface TaskCountData {
  date: string;
  完了タスク: number;
  [key: string]: string | number;
}

export interface TaskTimeData {
  date: string;
  経過時間: number;
  [key: string]: string | number;
}
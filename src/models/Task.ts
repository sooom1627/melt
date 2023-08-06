export interface Task {
  id : string;
  name : string;
  status:"created" | "started" | "paused" | "ended";
  created: Date;
  start ?: Date;
  end ?:Date;
  pauses?: { start: Date, end: Date }[];
  duration ?: number;
  tagIds?: string[];
}
export interface Task {
  id : string;
  name : string;
  status:"created" | "started" | "paused" | "ended";
  created: Date;
  start ?: Date;
  end ?:Date;
  pauses?: { start: Date | null, end: Date | null }[];
  duration ?: number;
  tagIds?: string[];
}
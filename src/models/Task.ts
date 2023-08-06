export interface Task {
  id : string;
  name : string;
  status:"created" | "started" | "ended";
  created: Date;
  start ?: Date;
  end ?:Date;
  duration ?: number;
  tagIds?: string[];
}
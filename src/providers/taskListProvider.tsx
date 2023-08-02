import { atom, DefaultValue, Loadable, MutableSnapshot } from "recoil";
import { Task } from "../models/Task";

const parseStoredTasks = (item: string): Task[] => {
	const parsedItem = JSON.parse(item);
	return parsedItem.map((task: any) => ({
		...task,
		created: new Date(task.created),
		start: task.start ? new Date(task.start) : undefined,
		end: task.end ? new Date(task.end) : undefined,
	}));
};

const localStorageEffect =
	(key: string) =>
	({
		setSelf,
		onSet,
	}: {
		setSelf: (newValue: Task[]) => void;
		onSet: (fn: (newValue: Task[]) => void) => void;
	}) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(parseStoredTasks(savedValue));
		}

		onSet((newValue: Task[]) => {
			if (newValue instanceof DefaultValue) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, JSON.stringify(newValue));
			}
		});
	};

export const taskState = atom<Task[]>({
	key: "taskState",
	default: [],
	effects_UNSTABLE: [localStorageEffect("tasks")],
});

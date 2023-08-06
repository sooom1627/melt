import { atom, DefaultValue, selector, useRecoilState } from "recoil";
//models
import { Task } from "../models/Task";
import { Tags } from "../models/Tags";

const parseStoredTasks = (item: string): Task[] => {
	const parsedItem = JSON.parse(item);
	return parsedItem.map((task: any) => {
		const newTask = { ...task };

		newTask.created = new Date(task.created);
		if (task.start) newTask.start = new Date(task.start);
		if (task.end) newTask.end = new Date(task.end);

		if (task.pauses) {
			newTask.pauses = task.pauses.map((pause: any) => ({
				start: new Date(pause.start),
				end: pause.end ? new Date(pause.end) : null,
			}));
		}

		return newTask;
	});
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

		// タグの存在するIDを取得
		const existingTagIds = JSON.parse(localStorage.getItem("tags") || "[]").map(
			(tag: Tags) => tag.id
		);

		if (savedValue != null) {
			const tasks = parseStoredTasks(savedValue);

			// ローカルストレージから存在するタグを取得し、taskに紐づくtagIdが存在しない場合それを削除する
			const sanitizedTasks = tasks.map((task) => {
				if (!task.tagIds) return task;

				return {
					...task,
					tagIds: task.tagIds.filter((tagId) => existingTagIds.includes(tagId)),
				};
			});

			setSelf(sanitizedTasks);
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

export const filterTasks = selector<Task[]>({
	key: "filterTasks",
	get: ({ get }) => {
		const tasks = get(taskState);
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set to start of today

		return tasks.filter((task) => {
			if (task.status === "ended" && task.end) {
				const endDate = new Date(task.end);
				endDate.setHours(0, 0, 0, 0); // Set to start of end date

				// If end date is before today
				if (endDate.getTime() < today.getTime()) {
					return false; // Exclude the task
				}
			}

			// If status is not 'ended' or 'end' is not before today
			return true; // Include the task
		});
	},
});

import { atom, selector } from "recoil";
import { taskState } from "./taskListProvider";

import { Task } from "../models/Task";

export const selectedTaskIdState = atom<string | null>({
	key: "selectedTaskIdState",
	default: null,
});

export const selectedTaskState = selector<Task | null>({
	key: "selectedTaskState",
	get: ({ get }) => {
		const selectedTaskId = get(selectedTaskIdState);
		if (selectedTaskId === null) {
			return null;
		}
		const tasks = get(taskState); // assuming taskState is your tasks atom
		return tasks.find((task) => task.id === selectedTaskId) || null;
	},
});

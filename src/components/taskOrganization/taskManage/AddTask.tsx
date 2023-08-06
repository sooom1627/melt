import React, { useState } from "react";
// Packages
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
// Recoil
import { useRecoilState } from "recoil";
import { taskState } from "../../../providers/taskListProvider";
// Models
import { Task } from "../../../models/Task";

export const AddTask: React.FC = () => {
	const [tasks, setTasks] = useRecoilState(taskState);

	const [inputTaskName, setInputTaskName] = useState<string>("");

	const addTask = (name: string) => {
		if (name !== "") {
			const created = new Date();
			const newTask: Task = {
				id: uuidv4(),
				name,
				created: created,
				status: "created",
			};
			setTasks([...tasks, newTask]);
		} else {
			toast.error("タスクを入力してください");
		}
	};

	const submitTask = (inputTaskName: string) => [
		addTask(inputTaskName),
		setInputTaskName(""),
	];

	return (
		<form
			className="w-full mb-8"
			onSubmit={(e) => {
				e.preventDefault();
				submitTask(inputTaskName);
			}}
		>
			<label className="mb-2 text-sm font-medium text-gray-900 sr-only">
				タスクを入力
			</label>
			<div className="relative w-100">
				<input
					type="text"
					value={inputTaskName}
					onChange={(e) => setInputTaskName(e.target.value)}
					className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="タスクを入力"
				/>
				<button
					type="submit"
					className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					追加
				</button>
			</div>
		</form>
	);
};

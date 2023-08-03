import React, { useEffect } from "react";
// models
import { Task } from "../../models/Task";

interface Props {
	tasks: Task[];
	showTasks: boolean;
	date: string;
	onClickShowTasks: () => void;
}

export const TasksSidebar: React.FC<Props> = ({
	tasks,
	showTasks,
	date,
	onClickShowTasks,
}) => {
	const getTasksEndedOnDate = (tasks: Task[], dateStr: string) => {
		const date = new Date(dateStr);

		return tasks.filter((task) => {
			if (task.status !== "ended" || !task.end) return false;

			return (
				task.end.getDate() === date.getDate() &&
				task.end.getMonth() === date.getMonth() &&
				task.end.getFullYear() === date.getFullYear()
			);
		});
	};

	useEffect(() => {
		const showTasksList = getTasksEndedOnDate(tasks, date);
		console.log(showTasksList);
	}, [date]);

	return (
		<>
			<div
				onClick={onClickShowTasks}
				className={`fixed inset-0 bg-black opacity-50 transition-transform duration-300 ease-in-out z-10 ${
					showTasks ? "block" : "hidden"
				}`}
			></div>
			<div
				className={`fixed right-0 top-0 h-full w-2/6 bg-white transition-transform duration-300 ease-in-out z-10 overflow-scroll ${
					showTasks ? "animate-slide" : "transform translate-x-full"
				}`}
			>
				<button onClick={onClickShowTasks} className="p-4">
					Close
				</button>
				{showTasks}
			</div>
		</>
	);
};

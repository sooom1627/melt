import React, { useEffect, useState } from "react";
// Custom hooks
import { useSortedTasks } from "../../hooks/useSortedAndFilteredTasks";
// Components
import { TaskList } from "../taskOrganization/taskManage/TaskList";
// Models
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
	const [showTasksList, setShowTasksList] = useState<Task[]>([]);
	const doneTasks = useSortedTasks(tasks, "end", "ended");

	useEffect(() => {
		const getTasksEndedOnDate = (tasks: Task[], dateStr: string) => {
			const targetDate = new Date(dateStr);

			return tasks.filter((task) => {
				if (task.status !== "ended" || !task.end) return false;
				// タスクの終了日をDateオブジェクトに変換
				const taskEndDate = new Date(task.end);
				// 年、月、日が一致するか確認（月は0から始まるため、+1する）
				return (
					taskEndDate.getFullYear() === targetDate.getFullYear() &&
					taskEndDate.getMonth() + 1 === targetDate.getMonth() + 1 &&
					taskEndDate.getDate() === targetDate.getDate()
				);
			});
		};
		const data = getTasksEndedOnDate(doneTasks, date);
		setShowTasksList(data);
	}, [date, tasks]);

	return (
		<>
			<div
				onClick={onClickShowTasks}
				className={`fixed inset-0 bg-black opacity-50 transition-transform duration-300 ease-in-out z-10 ${
					showTasks ? "block" : "hidden"
				}`}
			></div>
			<div
				className={`p-4 fixed right-0 top-0 h-full w-96 bg-white transition-transform duration-300 ease-in-out z-10 overflow-scroll ${
					showTasks ? "animate-slide" : "transform translate-x-full"
				}`}
			>
				<div className="flex flex-row my-4 px-2 items-center">
					<p className="text-lg font-bold">{date}の完了タスク</p>
					<button
						type="button"
						onClick={onClickShowTasks}
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="defaultModal"
					>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
				</div>
				<TaskList taskList={showTasksList} message="" type="done" />
			</div>
		</>
	);
};

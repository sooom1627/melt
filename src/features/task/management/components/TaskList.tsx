import React from "react";
// Components
import { TaskItem } from "./TaskItem";
// Models
import { Task } from "../../../../models/Task";

interface Props {
	taskList: Task[];
	message: string;
	type: "todo" | "doing" | "done";
}

export const TaskList: React.FC<Props> = ({ taskList, message, type }) => {
	return (
		<>
			{taskList.length > 0 ? (
				<ol className="relative border-l border-gray-200 dark:border-gray-700">
					{taskList.map((task) => (
						<TaskItem task={task} type={type} disable={message} />
					))}
				</ol>
			) : (
				<div className="w-full text-center py-40">
					<p className="mb-4 text-3xl font-extrabold text-gray-900">
						<span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-blue-700">
							{message}
						</span>
					</p>
				</div>
			)}
		</>
	);
};

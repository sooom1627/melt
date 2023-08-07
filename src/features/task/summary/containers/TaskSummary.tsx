import React, { useState } from "react";
// Packages
import { TaskCountBar } from "../components/TaskCountBar";
// Recoil
import { useRecoilState } from "recoil";
import { taskState } from "../../../../providers/taskListProvider";
// Components
import { TasksSidebar } from "../components/TasksSideBar";
import { TaskTimeBar } from "../components/TaskTimeBar";

export const TaskSummary = () => {
	// States for handling tasks visibility and selected date in the BarChart
	const [showTasks, setShowTasks] = useState<boolean>(false);
	const [date, setDate] = useState<string>("");
	const [tasks] = useRecoilState(taskState);

	const onClickShowTasks = () => {
		setShowTasks(!showTasks);
	};

	return (
		<div className="sm:ml-64 flex flex-col justify-center items-center h-screen py-16">
			<p className="text-2xl font-bold">タスク進捗</p>
			<TaskCountBar
				tasks={tasks}
				onClickShowTasks={onClickShowTasks}
				setDate={setDate}
			/>
			<TaskTimeBar
				tasks={tasks}
				onClickShowTasks={onClickShowTasks}
				setDate={setDate}
			/>
			<TasksSidebar
				tasks={tasks}
				date={date}
				showTasks={showTasks}
				onClickShowTasks={onClickShowTasks}
			/>
		</div>
	);
};

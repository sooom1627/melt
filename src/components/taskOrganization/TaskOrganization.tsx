import React, { useState } from "react";

import { useRecoilState } from "recoil";
import { taskState } from "../../providers/taskListProvider";

// components
import { TaskControl } from "./taskControl/TaskControl";
import { TaskManage } from "./taskManage/TaskManage";

// models
import { Task } from "../../models/Task";

export const TaskOrganization = () => {
	const [tasks, setTasks] = useRecoilState(taskState);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	return (
		<div className="flex px-12 sm:ml-60">
			<div className="md:w-1/2 mx-4 flex flex-col justify-start items-start h-screen pt-16">
				<TaskManage
					tasks={tasks}
					setTasks={setTasks}
					setSelectedTask={setSelectedTask}
				/>
			</div>
			<div className="md:w-1/2 mx-4 flex flex-col justify-center h-screen">
				<TaskControl
					selectedTask={selectedTask?.id}
					tasks={tasks}
					setTasks={setTasks}
				/>
			</div>
		</div>
	);
};

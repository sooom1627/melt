import React, { useEffect, useState } from "react";

// packege
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// components
import { TaskList } from "./TaskList";
import { AddTask } from "./AddTask";
import { CustomTabPanel, a11yProps } from "./MaterialUiTabs";
// customhooks
import { useSortedTasks } from "../../../hooks/useSortedAndFilteredTasks";

import { useRecoilState, useRecoilValue } from "recoil";
import { taskState, filterTasks } from "../../../providers/taskListProvider";
import {
	selectedTaskState,
	selectedTaskIdState,
} from "../../../providers/selectedTaskProvider";

// mdoels
import { Task } from "../../../models/Task";
//ui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const TaskManage: React.FC = () => {
	const [tasks] = useRecoilState(taskState);
	const filterdTasks = useRecoilValue(filterTasks);
	const [value, setValue] = React.useState(0);
	const [todoTasks, setTodoTasks] = useState<Task[]>([]);
	const [doingTasks, setDoingTasks] = useState<Task[]>([]);
	const [doneTasks, setDoneTasks] = useState<Task[]>([]);

	const createdTasks = useSortedTasks(filterdTasks, "created", "created");
	const startedTasks = useSortedTasks(filterdTasks, "start", "started");
	const endedTasks = useSortedTasks(filterdTasks, "end", "ended");

	useEffect(() => {
		setTodoTasks(createdTasks);
		setDoingTasks(startedTasks);
		setDoneTasks(endedTasks);
	}, [tasks]);

	const [selectedTaskId, setSelectedTaskId] =
		useRecoilState(selectedTaskIdState);
	const selectedTask = useRecoilValue(selectedTaskState);

	const selectTask = (taskId: string) => {
		setSelectedTaskId(taskId);
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<AddTask />
			<div className="overflow-scroll w-full">
				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab label="Todo" {...a11yProps(0)} />
							<Tab label="Doing" {...a11yProps(1)} />
							<Tab label="Done" {...a11yProps(2)} />
						</Tabs>
					</Box>
					<CustomTabPanel value={value} index={0}>
						<TaskList
							taskList={todoTasks}
							selectTask={selectTask}
							message="Let's add Tasks!"
							type="todo"
						/>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<TaskList
							taskList={doingTasks}
							selectTask={selectTask}
							message="Let's start a Task!"
							type="doing"
						/>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={2}>
						<TaskList
							taskList={doneTasks}
							selectTask={selectTask}
							message="Let's finish a Task!"
							type="done"
						/>
					</CustomTabPanel>
				</Box>
			</div>
		</>
	);
};

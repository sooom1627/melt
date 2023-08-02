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

import { useRecoilValue } from "recoil";
import { filterTasks } from "../../../providers/taskListProvider";

// mdoels
import { Task } from "../../../models/Task";
//ui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const TaskManage: React.FC = () => {
	const filterdTasks = useRecoilValue(filterTasks);
	const [value, setValue] = React.useState(0);
	const [tasksByStatus, setTasksByStatus] = useState<{
		todoTasks: Task[];
		doingTasks: Task[];
		doneTasks: Task[];
	}>({
		todoTasks: [],
		doingTasks: [],
		doneTasks: [],
	});

	const todoTasks = useSortedTasks(filterdTasks, "created", "created");
	const doingTasks = useSortedTasks(filterdTasks, "start", "started");
	const doneTasks = useSortedTasks(filterdTasks, "end", "ended");

	useEffect(() => {
		setTasksByStatus({
			todoTasks,
			doingTasks,
			doneTasks,
		});
	}, [filterTasks, todoTasks, doingTasks, doneTasks]);

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
							taskList={tasksByStatus.todoTasks}
							message="Let's add Tasks!"
							type="todo"
						/>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<TaskList
							taskList={tasksByStatus.doingTasks}
							message="Let's start a Task!"
							type="doing"
						/>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={2}>
						<TaskList
							taskList={tasksByStatus.doneTasks}
							message="Let's finish a Task!"
							type="done"
						/>
					</CustomTabPanel>
				</Box>
			</div>
		</>
	);
};

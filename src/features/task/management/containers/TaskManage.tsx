import React, { useEffect, useState } from "react";
// Packages
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// Recoil
import { useRecoilValue } from "recoil";
import { filterTasks } from "../../../../providers/taskListProvider";
// Customhooks
import { useSortedTasks } from "../../../../hooks/useSortedAndFilteredTasks";
// Components
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { CustomTabPanel, a11yProps } from "../components/MaterialUiTabs";
// Models
import { Task } from "../../../../models/Task";

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
	const doingTasks = useSortedTasks(filterdTasks, "start", "active");
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
			<div className="sticky w-full">
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
						variant="fullWidth"
					>
						<Tab label="Todo" {...a11yProps(0)} />
						<Tab label="Doing" {...a11yProps(1)} />
						<Tab label="Done" {...a11yProps(2)} />
					</Tabs>
				</Box>
			</div>
			<div className="overflow-scroll w-full">
				<Box sx={{ width: "100%" }}>
					<CustomTabPanel value={value} index={0}>
						<TaskList
							taskList={tasksByStatus.todoTasks}
							message="Create your task!"
							type="todo"
						/>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<TaskList
							taskList={tasksByStatus.doingTasks}
							message="Let's get to task!"
							type="doing"
						/>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={2}>
						<TaskList
							taskList={tasksByStatus.doneTasks}
							message="Let's get the task done."
							type="done"
						/>
					</CustomTabPanel>
				</Box>
			</div>
		</>
	);
};

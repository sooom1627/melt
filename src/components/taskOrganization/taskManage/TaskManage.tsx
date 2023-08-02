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
// mdoels
import { Task } from "../../../models/Task";
//ui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface Props {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export const TaskManage: React.FC<Props> = ({
	tasks,
	setTasks,
	setSelectedTask,
}) => {
	const [value, setValue] = React.useState(0);
	const [todoTasks, setTodoTasks] = useState<Task[]>([]);
	const [doingTasks, setDoingTasks] = useState<Task[]>([]);
	const [doneTasks, setDoneTasks] = useState<Task[]>([]);

	const createdTasks = useSortedTasks(tasks, "created", "created");
	const startedTasks = useSortedTasks(tasks, "start", "started");
	const endedTasks = useSortedTasks(tasks, "end", "ended");

	useEffect(() => {
		setTodoTasks(createdTasks);
		setDoingTasks(startedTasks);
		setDoneTasks(endedTasks);
	}, [tasks]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

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

	const selectTask = (taskId: string) => {
		const task = tasks.find((t) => t.id === taskId);
		setSelectedTask(task || null);
	};

	return (
		<>
			<AddTask addTask={addTask} />
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

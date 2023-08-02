import React, { useEffect, useState } from "react";

import { TaskEditModal } from "./TaskEditModal";
//utils
import {
	calculateElapsedTime,
	formatElapsedTime,
} from "../../../utils/timeUtils";
//models
import { Task } from "../../../models/Task";
// assets
import image from "../../../assets/Multitasking-amico.png";

interface Props {
	tasks: Task[];
	selectedTask?: string;
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskControl: React.FC<Props> = ({
	selectedTask,
	setTasks,
	tasks,
}) => {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const showTask = tasks.find((task) => task.id === selectedTask);

	useEffect(() => {
		if (showTask?.start && showTask.status === "started") {
			const interval = setInterval(() => {
				if (showTask.start !== undefined) {
					setElapsedTime(calculateElapsedTime(showTask.start));
				}
			}, 1000);
			return () => clearInterval(interval);
		} else if (showTask?.status === "ended" && showTask.duration) {
			setElapsedTime(showTask.duration);
		}
	}, [showTask]);

	const startTask = (taskId: string) => {
		setTasks(
			tasks.map((t) => {
				if (t.id === taskId) {
					const start = new Date();
					const status = "started";
					return { ...t, start, status };
				} else {
					return t;
				}
			})
		);
	};

	const endTask = (taskId: string) => {
		setTasks(
			tasks.map((t) => {
				if (t.id === taskId && t.start) {
					const status = "ended";
					const end = new Date();
					const duration = end.getTime() - t.start.getTime();
					return { ...t, status, end, duration };
				} else {
					return t;
				}
			})
		);
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const removeTask = (id: string) => {
		toggleModal();
		setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
	};

	const changeTaskName = (id: string, newName: string) => {
		toggleModal();
		setTasks((currentTasks) =>
			currentTasks.map((task) => {
				if (task.id === id) {
					return { ...task, name: newName };
				} else {
					return task;
				}
			})
		);
	};

	return (
		<>
			{showTask ? (
				<div>
					<TaskEditModal
						showModal={showModal}
						toggleModal={toggleModal}
						task={showTask}
						removeTask={removeTask}
						changeTaskName={changeTaskName}
					/>
					<div className="flex items-center h-screen w-full">
						<div className="shadow-md rounded-md w-full">
							<div className="p-5 text-center">
								<div
									className="w-full text-right cursor-pointer"
									onClick={() => toggleModal()}
								>
									<p className="text-2xl font-medium text-gray-900 hover:text-gray-500 dark:text-white">
										...
									</p>
								</div>
								<h5 className="text-xl font-semibold mb-4 break-words">
									{showTask?.name}
								</h5>
								<div>
									{showTask.status !== "created" && (
										<p>
											経過時間：
											<span className="text-4xl font-bold">
												{formatElapsedTime(elapsedTime)}
											</span>
										</p>
									)}
								</div>
								<div className="relative mb-4 mt-4">
									<div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
										<div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
									</div>
								</div>
								{showTask.start && (
									<p>開始時間：{showTask.start.toLocaleString()}</p>
								)}
								{showTask.end && (
									<p>終了時間：{showTask.end.toLocaleString()}</p>
								)}
								{showTask.status === "created" ? (
									<button
										className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 mt-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => startTask(showTask?.id)}
									>
										スタート
									</button>
								) : showTask.status === "started" ? (
									<button
										className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 mt-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => endTask(showTask?.id)}
									>
										終了
									</button>
								) : (
									<div></div>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="text-center">
					<img src={image} alt="" />
					<p className="text-xl font-bold">タスクを実行しよう！</p>
					<a
						target="_brank"
						href="https://storyset.com/people"
						className="text-xs text-gray-400 underline"
					>
						People illustrations by Storyset
					</a>
				</div>
			)}
		</>
	);
};

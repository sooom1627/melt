import React, { useEffect, useState } from "react";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { taskState } from "../../../providers/taskListProvider";
import { selectedTaskState } from "../../../providers/selectedTaskProvider";
import { tagListState } from "../../../providers/tagsProvider";
//utils
import {
	calculateElapsedTime,
	formatElapsedTime,
} from "../../../utils/timeUtils";
// components
import { TaskEditModal } from "./TaskEditModal";
// assets
import image from "../../../assets/Multitasking-amico.png";

export const TaskControl: React.FC = () => {
	const [tasks, setTasks] = useRecoilState(taskState);
	const selectedTask = useRecoilValue(selectedTaskState);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [tags] = useRecoilState(tagListState);

	useEffect(() => {
		if (selectedTask?.start && selectedTask.status === "started") {
			const interval = setInterval(() => {
				if (selectedTask.start !== undefined) {
					setElapsedTime(calculateElapsedTime(selectedTask.start));
				}
			}, 1000);
			return () => clearInterval(interval);
		} else if (selectedTask?.status === "ended" && selectedTask.duration) {
			setElapsedTime(selectedTask.duration);
		}
	}, [selectedTask]);

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

	return (
		<>
			{selectedTask ? (
				<div>
					<TaskEditModal
						showModal={showModal}
						toggleModal={toggleModal}
						task={selectedTask}
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
									{selectedTask?.name}
								</h5>
								<div>
									{tags.map((tag) => (
										<span
											key={tag.id}
											className={`${tag.color} ${
												selectedTask.tagIds?.includes(tag.id)
													? "opacity-100"
													: " hidden "
											} text-xs font-medium mr-2 px-2.5 py-0.5 mb-1 rounded inline-block`}
										>
											{tag.name}
										</span>
									))}
								</div>
								<div>
									{selectedTask.status !== "created" && (
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
								{selectedTask.start && (
									<p>開始時間：{selectedTask.start.toLocaleString()}</p>
								)}
								{selectedTask.end && (
									<p>終了時間：{selectedTask.end.toLocaleString()}</p>
								)}
								{selectedTask.status === "created" ? (
									<button
										className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 mt-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => startTask(selectedTask?.id)}
									>
										スタート
									</button>
								) : selectedTask.status === "started" ? (
									<button
										className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 mt-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => endTask(selectedTask?.id)}
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

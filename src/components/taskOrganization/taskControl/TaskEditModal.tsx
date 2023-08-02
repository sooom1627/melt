import React, { useEffect, useState } from "react";

import { Task } from "../../../models/Task";

interface Props {
	showModal: boolean;
	task: Task;
	toggleModal: () => void;
	removeTask: (id: string) => void;
	changeTaskName: (id: string, newName: string) => void;
}

export const TaskEditModal: React.FC<Props> = ({
	showModal,
	toggleModal,
	task,
	removeTask,
	changeTaskName,
}) => {
	const [editTaskName, setEditTaskName] = useState(task.name);

	useEffect(() => {
		setEditTaskName(task.name);
	}, [task]);

	const childClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log("Child clicked");
	};

	return (
		<>
			<div
				tabIndex={-1}
				onClick={toggleModal}
				className={`${
					showModal ? "bg-slate-700/50" : "hidden"
				}  duration-300 fixed flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full`}
			>
				<div
					onClick={childClick}
					className="relative w-full max-w-3xl max-h-full z-50"
				>
					<div className="relative bg-white rounded-lg shadow">
						<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								タスクの編集
							</h3>
							<button
								type="button"
								onClick={toggleModal}
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
						<div className="px-8 py-4">
							<label className="text-base font-bold text-gray-900">
								タスク名を変更
							</label>
							<input
								type="text"
								value={editTaskName}
								onChange={(e) => setEditTaskName(e.target.value)}
								className="my-3 block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="タスク名を編集"
							/>
						</div>
						<div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={() => changeTaskName(task.id, editTaskName)}
								className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
							>
								タスク名を変更する
							</button>
							<button
								onClick={() => removeTask(task.id)}
								className="text-white bg-red-500  hover:bg-red-600 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
							>
								タスクを削除する
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

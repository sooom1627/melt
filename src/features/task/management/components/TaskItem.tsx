import React, { useState } from "react";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import {
	selectedTaskIdState,
	selectedTaskState,
} from "../../../../providers/selectedTaskProvider";
import { tagListState } from "../../../../providers/tagsProvider";
// Utils
import { formatElapsedTime } from "../../../../utils/timeUtils";
// Components
import { TaskEditModal } from "../../control/components/TaskEditModal";
// Models
import { Task } from "../../../../models/Task";

interface Props {
	task: Task;
	type: "todo" | "doing" | "done";
	disable: string;
}

export const TaskItem: React.FC<Props> = ({ task, type, disable }) => {
	const [selectedTaskId, setSelectedTaskId] =
		useRecoilState(selectedTaskIdState);
	const selectedTask = useRecoilValue(selectedTaskState);
	const [tags] = useRecoilState(tagListState);
	const [showModal, setShowModal] = useState<boolean>(false);

	const selectTask = (taskId: string) => {
		setSelectedTaskId(taskId);
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<div>
			<li
				onClick={() => (disable !== "" ? selectTask(task.id) : console.log(""))}
				className="ml-4 pt-3 group rounded cursor-pointer bg-transparent transition duration-150 ease-in-out"
			>
				<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
				{type === "todo" ? (
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						作成: {task.created.toLocaleString()}
					</time>
				) : type === "doing" ? (
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						開始: {task.start?.toLocaleString()}
					</time>
				) : (
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						終了: {task.end?.toLocaleString()}
					</time>
				)}
				<div
					className={`flex items-start justify-between pb-3 ${
						disable !== ""
							? "relative after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-400 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100"
							: ""
					} `}
				>
					<div className="overflow-hidden">
						<h3 className="mt-2 mb-1 text-lg font-semibold text-gray-900 truncate ">
							{task.name}
						</h3>
						<p className="text-sm font-normal text-gray-500 dark:text-gray-400">
							{task.duration ? (
								`経過時間：${formatElapsedTime(task.duration)}`
							) : (
								<p></p>
							)}
						</p>
						<div>
							{tags.map((tag) => (
								<span
									key={tag.id}
									className={`${tag.color} ${
										task.tagIds?.includes(tag.id) ? "opacity-100" : " hidden "
									} text-xs font-medium mr-2 px-2.5 py-0.5 mb-1 rounded inline-block`}
								>
									{tag.name}
								</span>
							))}
						</div>
					</div>
					{disable !== "" ? (
						<div className="p-3" onClick={() => toggleModal()}>
							<svg
								className="w-5 h-5 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 16 3"
							>
								<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
							</svg>
						</div>
					) : (
						<></>
					)}
				</div>
				<TaskEditModal
					showModal={showModal}
					toggleModal={toggleModal}
					task={task}
				/>
			</li>
		</div>
	);
};

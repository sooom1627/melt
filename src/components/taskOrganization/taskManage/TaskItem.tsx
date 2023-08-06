import React from "react";
// Recoil
import { useRecoilState } from "recoil";
import { selectedTaskIdState } from "../../../providers/selectedTaskProvider";
import { tagListState } from "../../../providers/tagsProvider";
// utils
import { formatElapsedTime } from "../../../utils/timeUtils";
// models
import { Task } from "../../../models/Task";

interface Props {
	task: Task;
	type: "todo" | "doing" | "done";
	disable: string;
}

export const TaskItem: React.FC<Props> = ({ task, type, disable }) => {
	const [selectedTaskId, setSelectedTaskId] =
		useRecoilState(selectedTaskIdState);
	const [tags] = useRecoilState(tagListState);

	const selectTask = (taskId: string) => {
		setSelectedTaskId(taskId);
	};
	return (
		<li className="mb-5 ml-4">
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
			<div className="flex items-center justify-between">
				<div className="overflow-hidden">
					<h3 className="mt-2 mb-1 text-lg font-semibold text-gray-900 dark:text-white truncate">
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
					<div
						onClick={() => selectTask(task.id)}
						className="flex items-center px-4 py-2 ml-2 min-w-fit text-sm cursor-pointer font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700"
					>
						タスク詳細
						<svg
							className="w-3 h-3 ml-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</div>
				) : (
					<></>
				)}
			</div>
		</li>
	);
};

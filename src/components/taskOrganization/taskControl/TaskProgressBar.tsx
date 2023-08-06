import React, { useEffect, useState } from "react";
// Recoil
import { useRecoilValue } from "recoil";
import { selectedTaskState } from "../../../providers/selectedTaskProvider";
// models
import { Task } from "../../../models/Task";

type TimeSegment = {
	type: "work" | "pause";
	percentage: number;
};

const calculateTotalDuration = (task: Task) => {
	const now = new Date();
	return task.start ? now.getTime() - task.start.getTime() : 0;
};

const generateSegmentsForTask = (task: Task, totalDuration: number) => {
	let tempSegments: TimeSegment[] = [];
	let previousEndTime = task.start ? task.start.getTime() : 0;

	task.pauses?.forEach((pause) => {
		if (pause.start && pause.end) {
			const workSegmentPercentage =
				((pause.start.getTime() - previousEndTime) / totalDuration) * 100;
			tempSegments.push({
				type: "work",
				percentage: workSegmentPercentage,
			});

			const pauseSegmentPercentage =
				((pause.end.getTime() - pause.start.getTime()) / totalDuration) * 100;
			tempSegments.push({
				type: "pause",
				percentage: pauseSegmentPercentage,
			});

			previousEndTime = pause.end.getTime();
		}
	});

	const finalPercentage =
		((new Date().getTime() - previousEndTime) / totalDuration) * 100;
	tempSegments.push({
		type: "work",
		percentage: finalPercentage,
	});

	return tempSegments;
};

export const TaskProgressBar = () => {
	const selectedTask = useRecoilValue(selectedTaskState);
	const [segments, setSegments] = useState<TimeSegment[]>([]);

	useEffect(() => {
		const updateSegmentsForSelectedTask = () => {
			if (selectedTask) {
				const totalDuration = calculateTotalDuration(selectedTask);

				if (totalDuration) {
					const newSegments = generateSegmentsForTask(
						selectedTask,
						totalDuration
					);
					setSegments(newSegments);
				}
			}
		};

		if (selectedTask?.status === "started") {
			updateSegmentsForSelectedTask(); // 最初に一回実行
			const interval = setInterval(updateSegmentsForSelectedTask, 1000); // 1秒ごとの更新

			return () => clearInterval(interval); // クリーンアップ時にタイマーをクリア
		} else if (selectedTask?.status) {
			updateSegmentsForSelectedTask(); // 一度だけ実行
		}
	}, [selectedTask]);

	return (
		<div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
			{segments.map((segment, index) => (
				<div
					key={index}
					style={{ width: `${segment.percentage}%` }}
					className={
						segment.type === "work"
							? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 rounded"
							: ""
					}
				></div>
			))}
		</div>
	);
};

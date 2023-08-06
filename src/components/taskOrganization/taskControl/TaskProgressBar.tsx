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

export const TaskProgressBar = () => {
	const selectedTask = useRecoilValue(selectedTaskState);
	const [segments, setSegments] = useState<TimeSegment[]>([]);

	const updateSegments = (selectedTask: Task) => {
		if (selectedTask) {
			const now = new Date();
			let totalDuration = 0;
			let previousEndTime = 0;
			const tempSegments: TimeSegment[] = [];
			if (selectedTask.start) {
				totalDuration = now.getTime() - selectedTask.start.getTime();
				previousEndTime = selectedTask.start.getTime();
			}

			// selectedTask.pausesが存在して、その長さが0より大きい場合のみ
			if (
				totalDuration &&
				selectedTask.pauses &&
				selectedTask.pauses.length > 0
			) {
				selectedTask.pauses.forEach((pause) => {
					if (pause.start && pause.end) {
						const workSegmentPercentage =
							((pause.start.getTime() - previousEndTime) / totalDuration) * 100;
						tempSegments.push({
							type: "work",
							percentage: workSegmentPercentage,
						});

						const pauseSegmentPercentage =
							((pause.end.getTime() - pause.start.getTime()) / totalDuration) *
							100;
						tempSegments.push({
							type: "pause",
							percentage: pauseSegmentPercentage,
						});

						previousEndTime = pause.end.getTime();
					}
				});

				const finalWorkSegmentPercentage =
					((now.getTime() - previousEndTime) / totalDuration) * 100;
				tempSegments.push({
					type: "work",
					percentage: finalWorkSegmentPercentage,
				});
			} else {
				// pausesが存在しない、もしくは空の配列の場合、またはselectedTask.startが存在しない場合
				// 0%の作業時間もしくは100%の作業時間として追加
				tempSegments.push({
					type: "work",
					percentage: selectedTask.start ? 100 : 0,
				});
			}

			setSegments(tempSegments);
		}
	};

	useEffect(() => {
		// タスクが開始または一時停止中の場合のみタイマーを設定
		if (selectedTask?.status === "started") {
			// 定期的にセグメントを再計算
			const interval = setInterval(() => {
				updateSegments(selectedTask); // 下記で定義する関数
			}, 1000);

			// クリーンアップ時にタイマーをクリア
			return () => clearInterval(interval);
		} else if (selectedTask?.status) {
			updateSegments(selectedTask);
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
							? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
							: ""
					}
				></div>
			))}
		</div>
	);
};

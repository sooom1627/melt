import React from "react";
// packedge
import { BarChart } from "./charts/BarChart";

export const TaskSummary = () => {
	return (
		<>
			<div className="sm:ml-64 flex flex-col justify-center items-center h-screen py-16">
				<p className="text-2xl font-bold">タスク進捗</p>
				<BarChart />
			</div>
		</>
	);
};

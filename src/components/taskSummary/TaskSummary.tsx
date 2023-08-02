import React from "react";
// packedge
import { BarChart } from "./charts/BarChart";

export const TaskSummary = () => {
	return (
		<>
			<div className="sm:ml-64 flex justify-center items-center h-screen">
				<BarChart />
			</div>
		</>
	);
};

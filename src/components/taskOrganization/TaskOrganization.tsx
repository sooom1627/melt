import React from "react";
// Components
import { TaskControl } from "./taskControl/TaskControl";
import { TaskManage } from "./taskManage/TaskManage";

export const TaskOrganization = () => {
	return (
		<div className="flex px-12 sm:ml-60">
			{/* Task management section */}
			<div className="md:w-1/2 mx-4 flex flex-col justify-start items-start h-screen pt-16">
				<TaskManage />
			</div>
			{/* Task control section */}
			<div className="md:w-1/2 mx-4 flex flex-col justify-center h-screen pt-16">
				<TaskControl />
			</div>
		</div>
	);
};

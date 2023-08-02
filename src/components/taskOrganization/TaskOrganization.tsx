import React from "react";

// components
import { TaskControl } from "./taskControl/TaskControl";
import { TaskManage } from "./taskManage/TaskManage";

export const TaskOrganization = () => {
	return (
		<div className="flex px-12 sm:ml-60">
			<div className="md:w-1/2 mx-4 flex flex-col justify-start items-start h-screen pt-16">
				<TaskManage />
			</div>
			<div className="md:w-1/2 mx-4 flex flex-col justify-center h-screen">
				<TaskControl />
			</div>
		</div>
	);
};

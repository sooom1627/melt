import React from "react";
// Packages
import { Routes, Route } from "react-router-dom";
// Components
import { TaskOrganization } from "../components/taskOrganization/TaskOrganization";
import { TaskSummary } from "../components/taskSummary/TaskSummary";
import { TagsManage } from "../components/tagsManage/TagsManage";

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<TaskOrganization />} />
			<Route path="/summary" element={<TaskSummary />} />
			<Route path="/tags" element={<TagsManage />} />
		</Routes>
	);
};

import React from "react";
// Packages
import { Routes, Route } from "react-router-dom";
// Components
import { TaskOrganization } from "../components/task/TaskOrganization";
import { TaskSummary } from "../components/task/summary/containers/TaskSummary";
import { TagsManage } from "../components/tag/container/TagsManage";

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<TaskOrganization />} />
			<Route path="/summary" element={<TaskSummary />} />
			<Route path="/tags" element={<TagsManage />} />
		</Routes>
	);
};

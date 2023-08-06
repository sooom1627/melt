import React from "react";
// Packages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import { Sidebar } from "./components/Sidebar";
import { TaskOrganization } from "./components/taskOrganization/TaskOrganization";
import { TaskSummary } from "./components/taskSummary/TaskSummary";
import { TagsManage } from "./components/tagsManage/TagsManage";

function App() {
	return (
		<Router>
			<div className="App">
				{/* Global toast notifications container */}
				<ToastContainer position="top-left" />
				<Sidebar />
				<Routes>
					<Route path="/" element={<TaskOrganization />} />
					<Route path="/summary" element={<TaskSummary />} />
					<Route path="/tags" element={<TagsManage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

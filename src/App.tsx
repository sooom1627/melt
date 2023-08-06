import React from "react";
// Packages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import { Sidebar } from "./components/Sidebar";
import { AppRouter } from "./router/AppRouter";

function App() {
	return (
		<Router>
			<div className="App">
				{/* Global toast notifications container */}
				<ToastContainer position="top-left" />
				<Sidebar />
				<AppRouter />
			</div>
		</Router>
	);
}

export default App;

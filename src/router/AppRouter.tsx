import React from "react";
// Packages
import { Routes, Route } from "react-router-dom";
// routeCOnfig
import { routesConfig } from "./routesConfig";

export const AppRouter = () => {
	return (
		<Routes>
			{routesConfig.map((route) => (
				<Route path={route.path} element={route.element} />
			))}
		</Routes>
	);
};

import React from "react";
import image from "../../assets/Construction costs-amico.png";

export const TaskSummary = () => {
	return (
		<>
			<div className="sm:ml-64 flex justify-center items-center h-screen">
				<div className="p-80 text-center">
					<span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-blue-700">
						In Construction...
					</span>
					<img src={image} alt="" className="" />
					<a
						target="_brank"
						href="https://storyset.com/people"
						className="text-xs text-gray-400 underline"
					>
						People illustrations by Storyset
					</a>
				</div>
			</div>
		</>
	);
};

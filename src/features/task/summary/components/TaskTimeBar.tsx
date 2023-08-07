import React from "react";
// Packages
import { ResponsiveBar } from "@nivo/bar";
// Utils
import { generateDurationBarChartData } from "../../../../utils/chartDataUtils";
// Models
import { Task } from "../../../../models/Task";

interface Props {
	tasks: Task[];
	onClickShowTasks: () => void;
	setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskTimeBar: React.FC<Props> = ({
	tasks,
	onClickShowTasks,
	setDate,
}) => {
	const barChartData = generateDurationBarChartData(tasks);
	const formatMillisToHoursAndMinutes = (value: number | string) => {
		const milliseconds = typeof value === "number" ? value : parseFloat(value);
		let totalSeconds = Math.floor(milliseconds / 1000);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);

		return `${hours}時間${minutes}分`;
	};

	return (
		<ResponsiveBar
			data={barChartData}
			keys={["経過時間"]}
			indexBy="date"
			margin={{ top: 24, right: 200, bottom: 24, left: 60 }}
			padding={0.2}
			colors="#1D40AF"
			onClick={(dataPoint) => {
				setDate(dataPoint.data.date);
				onClickShowTasks();
			}}
			// ラベルの文字サイズ変更のためにカスタマイズ
			theme={{
				labels: {
					text: {
						fontSize: 14,
						fontWeight: "bold",
					},
				},
			}}
			borderColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
			axisTop={null}
			axisRight={null}
			axisLeft={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legendPosition: "middle",
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor="#ffffff"
			label={(d: any) => formatMillisToHoursAndMinutes(d.value)}
			tooltip={() => null}
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 1,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: "left-to-right",
					symbolSize: 20,
					effects: [
						{
							on: "hover",
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
			role="application"
			ariaLabel="Nivo bar chart demo"
			barAriaLabel={(e) =>
				e.id + ": " + e.formattedValue + " in date: " + e.indexValue
			}
		/>
	);
};

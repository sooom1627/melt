import React from "react";
//packedge
import { ResponsiveBar } from "@nivo/bar";
//Recoil
import { useRecoilState } from "recoil";
import { taskState } from "../../../providers/taskListProvider";
// utils
import { generateBarChartData } from "../../../utils/chartDataUtils";

export const BarChart: React.FC = () => {
	const [tasks] = useRecoilState(taskState);
	const barChartData = generateBarChartData(tasks);

	return (
		<ResponsiveBar
			data={barChartData}
			keys={["完了タスク"]}
			indexBy="date"
			margin={{ top: 100, right: 200, bottom: 100, left: 60 }}
			padding={0.3}
			colors="#1876D1"
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
				legend: "日にち",
				legendPosition: "middle",
				legendOffset: 32,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor="#ffffff"
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
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
				e.id + ": " + e.formattedValue + " in country: " + e.indexValue
			}
		/>
	);
};

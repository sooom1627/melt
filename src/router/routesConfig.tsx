// Components
import { TaskOrganization } from "../features/task/TaskOrganization";
import { TaskSummary } from "../features/task/summary/containers/TaskSummary";
import { TagsManage } from "../features/tag/container/TagsManage";

export const routesConfig = [
	{
		path: "/",
		element: <TaskOrganization />,
	},
	{
		path: "/summary",
		element: <TaskSummary />,
	},
	{
		path: "/tags",
		element: <TagsManage />,
	},
];

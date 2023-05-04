import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main/Main.";
import CreateMember from "../Pages/CreateMember/CreateMember";
import Members from "../Pages/Members/Members";
import EditMember from "../Pages/EditMember/EditMember";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "criar-membro",
				element: <CreateMember />,
			},
			{
				path: "editar-membro/:id",
				element: <EditMember />,
			},
			{
				path: "membros",
				element: <Members />,
			},
		],
	},
	{
		path: "noticias",
	},
]);

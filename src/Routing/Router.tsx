import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main/Main.";
import Authentication from "../Pages/Authentication/Login/Authentication";
import Pontos from "../Pages/Pontos/Pontos";
import Servidor from "../Pages/Servidor/Servidor";
import Administrativa from "../Pages/Admnistrativa/Administrativa";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "pontos",
				element: <Pontos />,
			},
			{
				path: "servidor",
				element: <Servidor />,
			},
			{
				path: "area-administrativa",
				element: <Administrativa />,
			},
		],
	},
	{
		path: "/login",
		element: <Authentication />,
	},
]);

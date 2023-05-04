import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routing/Router";

import "./main.scss";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
	uri: "https://api-sa-east-1.hygraph.com/v2/clh81fvt0893f01ujaitm8ska/master",
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
);

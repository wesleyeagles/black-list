import { useState } from "react";

export function useAuthenticated() {
	const [authenticated, setAuthenticated] = useState(false);

	const setUserToken = (userToken: string) => {
		localStorage.setItem("token", JSON.stringify(userToken));
	};

	const token = JSON.parse(localStorage.getItem("token") || "{}");

	return { authenticated, setAuthenticated, setUserToken, token };
}

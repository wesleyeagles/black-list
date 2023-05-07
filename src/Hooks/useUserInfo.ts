import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getAccountById } from "../Queries/getAccountById";

const useUserInfo = () => {
	const [data, setData] = useState<any>();

	const userId = localStorage.getItem("token");

	const [getAccountData] = useLazyQuery(getAccountById);

	useEffect(() => {
		if (userId) {
			getAccountData({
				variables: {
					id: userId.replace(/["]/g, ""),
				},
				onCompleted: (data) => {
					setData(data);
				},
				onError: (error) => {
					console.log({ error });
				},
			});
		}
	}, [userId]);

	return {
		userId,
		data,
	};
};

export default useUserInfo;

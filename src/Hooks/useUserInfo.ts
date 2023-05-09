import { useEffect, useState } from "react";
import { useGetAccountByIdLazyQuery } from "../GraphQL/generated";

const useUserInfo = () => {
	const [data, setData] = useState<any>();
	const userId = localStorage.getItem("token");

	const [getAccountData] = useGetAccountByIdLazyQuery();

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

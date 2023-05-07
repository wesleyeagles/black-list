import { gql } from "@apollo/client";

export const createAccount = gql`
	mutation createAccount($data: AccountCreateInput!) {
		createAccount(data: $data) {
			id
		}
	}
`;

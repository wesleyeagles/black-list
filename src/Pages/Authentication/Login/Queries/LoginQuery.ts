import { gql } from "@apollo/client";

export const useLogin = gql`
	query useLogin($login: String!) {
		account(where: { login: $login }) {
			id
			login
			password
			members {
				nickname
			}
		}
	}
`;

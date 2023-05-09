import { gql } from "@apollo/client";

export const getAccountById = gql`
	query getAccountById($id: ID!) {
		account(where: { id: $id }) {
			login
			password
			id
			members {
				id
				nickname
				idClass
				playOnOpen
				cargo
				pontos
				level
				memberStatus
				idRace
				cpt
			}
		}
	}
`;

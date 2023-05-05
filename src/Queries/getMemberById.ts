import { gql } from "@apollo/client";

export const getMemberById = gql`
	query getMemberById($nickname: String!) {
		member(where: { nickname: $nickname }) {
			nickname
			playOnOpen
			class
			discordId
			cargo
			id
		}
	}
`;

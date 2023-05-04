import { gql } from "@apollo/client";

export const getMembers = gql`
	query getAccounts {
		members(orderBy: nickname_ASC, first: 100) {
			id
			nickname
			discordId
			class
			playOnOpen
		}
	}
`;

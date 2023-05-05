import { gql } from "@apollo/client";

export const createMember = gql`
	mutation createMember($nickname: String!, $discordId: String!, $class: String!, $playOnOpen: Boolean!) {
		createMember(data: { nickname: $nickname, discordId: $discordId, class: $class, playOnOpen: $playOnOpen, cargo: "Membro" }) {
			id
		}
		publishMember(where: { nickname: $nickname }, to: PUBLISHED) {
			id
		}
	}
`;

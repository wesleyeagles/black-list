import { gql } from "@apollo/client";

export const createMember = gql`
	mutation createMember($id: ID!, $nickname: String!, $class: String!, $playOnOpen: Boolean!, $level: Int!, $idRace: Int!, $cpt: Float, $status: Boolean!) {
		updateAccount(
			where: { id: $id }
			data: {
				members: {
					create: {
						nickname: $nickname
						class: $class
						playOnOpen: $playOnOpen
						cargo: "Membro"
						cpt: $cpt
						level: $level
						memberStatus: $status
						idRace: $idRace
						clhds52em2wb701ukde1ma626: { connect: { id: $id } }
					}
				}
			}
		) {
			id
		}
		publishMember(where: { nickname: $nickname }) {
			id
		}
	}
`;

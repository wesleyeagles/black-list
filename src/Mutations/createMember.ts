import { gql } from "@apollo/client";

export const createMember = gql`
	mutation createMember($id: ID!, $nickname: String!, $idClass: Int!, $playOnOpen: Boolean!, $level: Int!, $idRace: Int!, $cpt: Float, $status: Boolean!) {
		updateAccount(
			where: { id: $id }
			data: {
				members: {
					create: {
						nickname: $nickname
						idClass: $idClass
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

import { gql } from "@apollo/client";

export const editMember = gql`
	mutation editMember($id: ID!, $nickname: String, $idClass: Int, $playOnOpen: Boolean, $level: Int, $idRace: Int, $cpt: Float, $memberStatus: Boolean) {
		updateMember(
			data: { nickname: $nickname, idClass: $idClass, playOnOpen: $playOnOpen, cargo: "Membro", cpt: $cpt, level: $level, memberStatus: $memberStatus, idRace: $idRace }
			where: { id: $id }
		) {
			id
		}
		publishMember(where: { nickname: $nickname }) {
			id
		}
	}
`;

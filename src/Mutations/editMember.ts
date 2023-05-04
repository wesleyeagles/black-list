import { gql } from "@apollo/client";

export const editMember = gql`
	mutation editMember($data: MemberUpdateInput!, $id: ID!) {
		updateMember(data: $data, where: { id: $id }) {
			id
			nickname
		}
		publishMember(where: { id: $id }) {
			id
			nickname
		}
	}
`;

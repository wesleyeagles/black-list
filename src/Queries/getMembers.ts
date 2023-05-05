import { gql } from "@apollo/client";

export const getMembers = gql`
	query getAccounts {
		members(orderBy: nickname_ASC, first: 100) {
			id
			nickname
			discordId
			class
			playOnOpen
			cargo
		}
	}
`;

export const getMembersPunisher = gql`
	query getAccounts {
		members(where: { class: "Punisher" }) {
			id
			nickname
			discordId
			class
			playOnOpen
			cargo
		}
	}
`;

export const getMembersTanker = gql`
	query getAccounts {
		members(where: { class: "Tanker" }) {
			id
			nickname
			discordId
			class
			playOnOpen
			cargo
		}
	}
`;

export const getMembersStriker = gql`
	query getAccounts {
		members(where: { class: "Striker" }) {
			id
			nickname
			discordId
			class
			playOnOpen
			cargo
		}
	}
`;

export const getMembersTrapper = gql`
	query getAccounts {
		members(where: { class: "Trapper" }) {
			id
			nickname
			discordId
			class
			playOnOpen
			cargo
		}
	}
`;

export const getMembersSpec = gql`
	query getAccounts {
		members(where: { class: "Spec" }) {
			id
			nickname
			discordId
			class
			playOnOpen
			cargo
		}
	}
`;

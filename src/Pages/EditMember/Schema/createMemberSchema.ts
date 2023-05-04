import { boolean, object, string } from "zod";

export const createMemberSchema = object({
	nickname: string({
		required_error: "Campo nickname é obrigatório",
	})
		.min(3, {
			message: "Número minimo de 3 caracteres",
		})
		.max(15, {
			message: "Número maximo de 15 caracteres",
		}),
	discordId: string({
		required_error: "Campo Discord ID é obrigatório",
	}).min(1, {
		message: "Campo Discord ID é obrigatório",
	}),
	class: string({
		required_error: "Campo classe é obrigatório",
		invalid_type_error: "Campo classe é obrigatório",
	}),
	playOnOpen: boolean().optional(),
});

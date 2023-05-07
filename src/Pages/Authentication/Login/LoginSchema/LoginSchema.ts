import { z } from "zod";

export const loginSchema = z.object({
	login: z
		.string({
			required_error: "Campo email é obrigatório",
		})
		.email({
			message: "Login deve ser em formato de email",
		}),
	password: z.string({
		required_error: "Senha é um campo obrigatório",
	}),
});

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
	login: z.string({
		required_error: "Campo email é obrigatório",
	}),
	password: z
		.string({
			required_error: "Senha é um campo obrigatório",
		})
		.regex(new RegExp(".*[A-Z].*"), "A senha deve conter ao menos uma letra maiuscula")
		.regex(new RegExp(".*[a-z].*"), "A senha deve conter ao menos uma letra minuscula")
		.regex(new RegExp(".*\\d.*"), "A senha deve conter ao menos um número")
		.regex(new RegExp(".*[$*&@#]"), "A senha deve conter ao menos um caracter especial")
		.min(8, {
			message: "A senha deve conter no minimo 8 caracteres",
		})
		.max(15, {
			message: "A senha deve conter no máximo 15 caracteres",
		}),
	confirmPassword: z.string({
		required_error: "Você deve confirmar a senha",
	}),
});

const useFormSignUp = () => {
	const methods = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
	});

	return {
		methods,
	};
};

export default useFormSignUp;

export type SignUpHandleSubmitValues = z.infer<typeof signUpSchema>;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const personagemSchema = z.object({
	nickname: z
		.string({
			required_error: "Campo nickname é obrigatório",
		})
		.min(3, {
			message: "Minimo de 3 caracteres",
		})
		.max(15, {
			message: "Máximo de 15 caracteres",
		}),
	level: z.number({
		required_error: "Você deve confirmar a senha",
	}),
	idRace: z.number({
		required_error: "Você deve selecionar uma raça",
	}),
	class: z
		.string({
			required_error: "Você deve selecionar uma classe",
		})
		.nullable(),

	cpt: z.number().nullable().optional(),
	status: z.boolean({
		required_error: "Você deve confirmar a senha",
	}),
	playOnOpen: z
		.boolean({
			required_error: "Você deve confirmar a senha",
		})
		.optional(),
});

interface IFormPersonagemProps {
	defaultValues?: z.infer<typeof personagemSchema>;
}

const usePersonagemForm = ({ defaultValues }: IFormPersonagemProps) => {
	const methods = useForm<z.infer<typeof personagemSchema>>({
		resolver: zodResolver(personagemSchema),
		defaultValues: defaultValues ?? {
			level: 1,
			status: true,
			playOnOpen: false,
		},
	});

	return {
		methods,
	};
};

export default usePersonagemForm;

export type PersonagemHandleSubmitValues = z.infer<typeof personagemSchema>;

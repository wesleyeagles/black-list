import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const pontoSchema = z.object({
	mensagem: z
		.string()
		.min(3, {
			message: "Minimo de 3 caracteres",
		})
		.max(20, {
			message: "Máximo de 20 caracteres",
		})
		.optional()
		.nullable(),
	ponto: z.number({
		required_error: "Você deve selecionar uma ação",
	}),
	idAcao: z.number({
		required_error: "Você deve selecionar uma ação",
	}),
});

const usePontoForm = () => {
	const methods = useForm<z.infer<typeof pontoSchema>>({
		resolver: zodResolver(pontoSchema),
	});

	return {
		methods,
	};
};

export default usePontoForm;

export type PontoHandleSubmitForm = z.infer<typeof pontoSchema>;

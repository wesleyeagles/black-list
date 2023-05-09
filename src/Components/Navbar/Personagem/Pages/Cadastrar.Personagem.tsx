import { Modal } from "react-bootstrap";
import PersonagemForm from "../PersonagemForm";
import "../Personagem.scss";
import useUserInfo from "../../../../Hooks/useUserInfo";
import { PersonagemHandleSubmitValues } from "../Hooks/usePersonagemForm";
import { toast } from "react-toastify";
import { useCreateMemberMutation } from "../../../../GraphQL/generated";

interface IPersonagemProps {
	show: boolean;
	setShow: (show: boolean) => void;
}

const CadastrarPersonagem = ({ show, setShow }: IPersonagemProps) => {
	const [createMemberMutation] = useCreateMemberMutation();
	const { data: userData } = useUserInfo();

	const handleSubmit = async (data: PersonagemHandleSubmitValues) => {
		const toastId = toast.loading("Personagem sendo criado, aguarde...", {
			type: toast.TYPE.DEFAULT,
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: true,
			progress: undefined,
			theme: "colored",
		});

		await createMemberMutation({
			refetchQueries: ["getAccountById"],
			variables: {
				id: userData.account.id,
				...data,
			},
			onCompleted: () => {
				toast.update(toastId, {
					type: toast.TYPE.SUCCESS,
					position: "top-right",
					autoClose: 5000,
					render: "Personagem criado com sucesso!",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					progress: undefined,
					theme: "colored",
				});
				setShow(false);
			},
			onError: (err: any) => {
				console.log({ err });
				if ({ err }.err.networkError?.result.errors[0].message.includes("nickname")) {
					toast.update(toastId, {
						type: toast.TYPE.ERROR,
						position: "top-right",
						autoClose: 5000,
						render: "Este Nickname já está em uso",
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						isLoading: false,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}
			},
		});
	};

	return (
		<Modal centered show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Informações do personagem</Modal.Title>
			</Modal.Header>
			<PersonagemForm onSubmit={handleSubmit} setShow={setShow} />
		</Modal>
	);
};

export default CadastrarPersonagem;

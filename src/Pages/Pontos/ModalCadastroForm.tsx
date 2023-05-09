import { Button, Form, Modal } from "react-bootstrap";
import usePontoForm, { PontoHandleSubmitForm } from "./Hooks/usePersonagemForm";
import CustomSelect from "../../Components/FormInputs/CustomSelectInput/CustomSelect";
import CustomNumberInput from "../../Components/FormInputs/CustomNumberInput/CustomNumber";
import CustomText from "../../Components/FormInputs/CustomTextInput/CustomText";
import useUserInfo from "../../Hooks/useUserInfo";
import { GetLogPontosDocument, GetMembersDocument, TopThreePontosDocument, useCreateLogPontoMutation, useEditMemberMutation } from "../../GraphQL/generated";
import { toast } from "react-toastify";

interface iFormDatatableProps {
	setShow: (show: boolean) => void;
}

const ModalCadastroForm = ({ setShow }: iFormDatatableProps) => {
	const { methods } = usePontoForm();
	const { data: dataAccount } = useUserInfo();

	const [editMember] = useEditMemberMutation();
	const [createLog] = useCreateLogPontoMutation();

	const onSubmit = async (data: PontoHandleSubmitForm) => {
		const toastId = toast.loading("Pontos sendo adicionado, aguarde...", {
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

		await editMember({
			refetchQueries: [
				{
					query: GetMembersDocument,
				},
				{
					query: TopThreePontosDocument,
				},
			],
			variables: {
				id: dataAccount.account.members[0].id,
				pontos: dataAccount.account.members[0].pontos + data.ponto,
			},
			onCompleted: async () => {
				await createLog({
					refetchQueries: [
						{
							query: GetLogPontosDocument,
						},
					],
					variables: {
						nickname: dataAccount.account.members[0].nickname,
						Mensagem: data.mensagem,
						...data,
					},
					onCompleted: () => {
						toast.update(toastId, {
							type: toast.TYPE.SUCCESS,
							position: "top-right",
							autoClose: 5000,
							render: "Pontos adicionados com sucesso!",
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
					onError: () => {
						toast.update(toastId, {
							type: toast.TYPE.ERROR,
							position: "top-right",
							autoClose: 5000,
							render: "Erro interno do servidor!",
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							isLoading: false,
							progress: undefined,
							theme: "colored",
						});
					},
				});
			},
			onError: (err) => {
				console.log({ err });
			},
		});
	};

	return (
		<Modal.Body>
			<Form onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="cadastro-grid">
					<div className="acao">
						<CustomSelect
							placeholder="Selecione a ação"
							label="Ação"
							name="idAcao"
							control={methods.control}
							onChange={(val: any) => {
								if (val.value === 1) {
									methods.setValue("ponto", 200);
								}
							}}
							options={[
								{
									value: 1,
									label: "PB Blink",
								},
							]}
						/>
					</div>
					<div className="pontos">
						<CustomNumberInput disabled control={methods.control} name="ponto" label="Pontos" />
					</div>

					<div className="mensagem">
						<CustomText label="Mensagem" control={methods.control} name="mensagem" />
					</div>
				</div>
				<div className="d-flex gap-2 justify-content-end">
					<Button variant="danger" onClick={() => setShow(false)}>
						Cancelar
					</Button>
					<Button type="submit">Cadastrar</Button>
				</div>
			</Form>
		</Modal.Body>
	);
};

export default ModalCadastroForm;

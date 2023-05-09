import { Modal } from "react-bootstrap";
import PersonagemForm from "../PersonagemForm";
import useUserInfo from "../../../../Hooks/useUserInfo";
import { PersonagemHandleSubmitValues } from "../Hooks/usePersonagemForm";
import { toast } from "react-toastify";
import { removeEqualObject } from "../../../../Utils/Utils";
import { GetMemberByNicknameDocument, useEditMemberMutation, useGetMemberByNicknameLazyQuery } from "../../../../GraphQL/generated";
import { useState, useEffect } from "react";

interface IPersonagemProps {
	show: boolean;
	setShow: (show: boolean) => void;
}

const EditaPersonagem = ({ show, setShow }: IPersonagemProps) => {
	const [editMemberMutation] = useEditMemberMutation();
	const [data, setData] = useState<any>();
	const { data: userData } = useUserInfo();
	const [getMember] = useGetMemberByNicknameLazyQuery();

	useEffect(() => {
		if (userData) {
			getMember({
				variables: {
					nickname: userData.account.members[0].nickname,
				},
				onCompleted: (res) => {
					setData(res);
				},
			});
		}
	}, [userData, data]);

	const handleSubmit = async (data: PersonagemHandleSubmitValues) => {
		const toastId = toast.loading("Personagem sendo editado, aguarde...", {
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

		const dataObj = removeEqualObject(data, userData.account.members[0]);

		if (Object.keys(dataObj).length === 0) {
			toast.update(toastId, {
				type: toast.TYPE.INFO,
				position: "top-right",
				autoClose: 5000,
				render: "Nenhum dado foi alterado",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				isLoading: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			setShow(false);
		} else {
			await editMemberMutation({
				refetchQueries: [
					{
						query: GetMemberByNicknameDocument,
						variables: {
							nickname: data.nickname,
						},
					},
				],
				variables: {
					id: userData.account.members[0].id,
					...dataObj,
				},
				onCompleted: () => {
					toast.update(toastId, {
						type: toast.TYPE.SUCCESS,
						position: "top-right",
						autoClose: 5000,
						render: "Personagem editado com sucesso!",
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						progress: undefined,
						theme: "colored",
					});
					setData(data);
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
		}
	};

	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Informações do personagem</Modal.Title>
			</Modal.Header>
			{data ? <PersonagemForm setShow={setShow} onSubmit={handleSubmit} defaultValues={data.member} /> : null}
		</Modal>
	);
};

export default EditaPersonagem;

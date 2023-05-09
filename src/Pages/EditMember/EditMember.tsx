import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMemberSchema } from "./Schema/createMemberSchema";
import { useLazyQuery, useMutation } from "@apollo/client";
import CustomText from "../../Components/FormInputs/CustomTextInput/CustomText";
import CustomSelect from "../../Components/FormInputs/CustomSelectInput/CustomSelect";
import CustomCheckbox from "../../Components/FormInputs/CustomCheckbox/CustomCheckbox";
import "./createmember.scss";
import LoadingIcon from "../../assets/Icones/LoadingIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { editMember } from "../../Mutations/editMember";

const EditMember = () => {
	return <div>Teste</div>;
	const { control, handleSubmit, setError, setValue } = useForm({
		resolver: zodResolver(createMemberSchema),
		defaultValues: {
			nickname: "",
			discordId: "",
			class: "",
			playOnOpen: false,
		},
	});

	const navigate = useNavigate();

	const [editeMember, { loading }] = useMutation(editMember);

	const id = useParams();

	const [getMember, { data: dataMember }] = useLazyQuery(getMemberById);

	useEffect(() => {
		getMember({
			variables: {
				nickname: id.id,
			},
			onCompleted: (data) => {
				setValue("nickname", data.member.nickname);
				setValue("class", data.member.class);
				setValue("discordId", data.member.discordId);
				setValue("playOnOpen", data.member.playOnOpen);
			},
			onError: (res) => {
				console.log({ res });
			},
		});
	}, [id]);

	const onSubmit = (data: any) => {
		const toastId = toast.loading("Membro está sendo editado...", {
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

		editeMember({
			refetchQueries: "all",
			variables: {
				id: dataMember.member.id,
				data: data,
			},
			onCompleted: () => {
				toast.update(toastId, {
					type: toast.TYPE.SUCCESS,
					position: "top-right",
					autoClose: 5000,
					render: "Membro editado com sucesso!",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					progress: undefined,
					theme: "colored",
				});

				navigate("/membros");
			},
			onError: (error: any) => {
				console.log({ error });
				if ({ error }.error.networkError?.result.errors[0].message.includes("nickname")) {
					setError("nickname", {
						message: "Esse Nickname já existe",
					});
					toast.update(toastId, {
						type: toast.TYPE.ERROR,
						position: "top-right",
						autoClose: 5000,
						render: "Esse Nickname já existe",
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
		<div className="create-member">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<CustomText name="nickname" label="Nickname *" control={control} placeholder="" />
				<CustomSelect
					label="Classe *"
					control={control}
					placeholder="Escolha sua classe"
					name="class"
					options={[
						{
							value: "Punisher",
							label: "Punisher",
						},
						{
							value: "Tanker",
							label: "Tanker",
						},
						{
							value: "Striker",
							label: "Striker",
						},
						{
							value: "Trapper",
							label: "Trapper",
						},
						{
							value: "Spec",
							label: "Spec",
						},
					]}
				/>

				<CustomText label="Discord ID *" control={control} placeholder="exemplo#1110" name="discordId" />
				<CustomCheckbox label="Vai querer entrar na pt principal na abertura?" control={control} name="playOnOpen" />

				<Button disabled={loading ? true : false} variant="primary" type="submit" className="my-button">
					{loading ? (
						<div className="loading">
							{" "}
							<LoadingIcon /> Carregando...
						</div>
					) : (
						<div>Editar</div>
					)}
				</Button>
			</Form>
		</div>
	);
};

export default EditMember;

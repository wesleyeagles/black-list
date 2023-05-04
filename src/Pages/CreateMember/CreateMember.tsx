import { Button, Form, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMemberSchema } from "./Schema/createMemberSchema";
import { useMutation } from "@apollo/client";
import { createMember } from "../../Mutations/createMember";
import CustomText from "../../Components/FormInputs/CustomTextInput/CustomText";
import CustomSelect from "../../Components/FormInputs/CustomSelectInput/CustomSelect";
import CustomCheckbox from "../../Components/FormInputs/CustomCheckbox/CustomCheckbox";
import "./createmember.scss";
import LoadingIcon from "../../assets/Icones/LoadingIcon";

const CreateMember = () => {
	const { control, handleSubmit, setError, getValues } = useForm({
		resolver: zodResolver(createMemberSchema),
		defaultValues: {
			nickname: "",
			discordId: "",
			class: "",
			playOnOpen: false,
		},
	});

	const [addAccount, { loading }] = useMutation(createMember);

	const onSubmit = (data: any) => {
		const toastId = toast.loading("Membro está sendo registrado...", {
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

		addAccount({
			refetchQueries: ["getAccounts"],
			variables: {
				...data,
			},
			onCompleted: () => {
				toast.update(toastId, {
					type: toast.TYPE.SUCCESS,
					position: "top-right",
					autoClose: 5000,
					render: "Membro criado com sucesso!",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					isLoading: false,
					progress: undefined,
					theme: "colored",
				});
			},
			onError: (error: any) => {
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

				<Button onClick={() => console.log(getValues())} disabled={loading ? true : false} variant="primary" type="submit" className="my-button">
					{loading ? (
						<div className="loading">
							{" "}
							<LoadingIcon /> Carregando...
						</div>
					) : (
						<div>Enviar</div>
					)}
				</Button>
			</Form>
		</div>
	);
};

export default CreateMember;

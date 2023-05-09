import { Button, Form } from "react-bootstrap";
import CustomText from "../../../Components/FormInputs/CustomTextInput/CustomText";
import useFormSignUp, { SignUpHandleSubmitValues } from "../Login/SignUpSchema/SignUpSchema";
import { toast } from "react-toastify";
import { useCreateAccountMutation } from "../../../GraphQL/generated";

interface ISignUpProps {
	setPage: (page: boolean) => void;
}

const SignUp = ({ setPage }: ISignUpProps) => {
	const { methods } = useFormSignUp();

	const [createAccountMutation] = useCreateAccountMutation();

	const onSubmitSignUp = async ({ confirmPassword, ...data }: SignUpHandleSubmitValues) => {
		const password = methods.watch("password");
		const cPassword = methods.watch("confirmPassword");

		if (password === cPassword) {
			const toastId = toast.loading("Conta está sendo criada, aguarde alguns segundos...", {
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

			await createAccountMutation({
				variables: {
					data: data,
				},
				onCompleted: (res) => {
					console.log(res);
					toast.update(toastId, {
						type: toast.TYPE.SUCCESS,
						position: "top-right",
						autoClose: 8000,
						render: "Conta criada com sucesso! Aguarde um administrador aprovar o acesso",
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						progress: undefined,
						theme: "colored",
					});

					setPage(true);
				},
				onError: (error: any) => {
					console.log({ error });
					if ({ error }.error.networkError?.result.errors[0].message.includes("login")) {
						toast.update(toastId, {
							type: toast.TYPE.ERROR,
							position: "top-right",
							autoClose: 5000,
							render: "Este email já está em uso",
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
			}).catch((err) => {
				console.log(err);
			});
		} else {
			methods.setError("confirmPassword", {
				message: "A senha não confere!",
			});
		}
	};
	return (
		<Form onSubmit={methods.handleSubmit(onSubmitSignUp)}>
			<CustomText label="Email" name="login" placeholder="usuario@gmail.com" control={methods.control} />
			<CustomText label="Senha" type="password" name="password" placeholder="*********" control={methods.control} />
			<CustomText label="Confirmar Senha" type="password" name="confirmPassword" placeholder="*********" control={methods.control} />
			<div className="d-flex justify-content-center mt-4">
				<Button className="btn-login" type="submit">
					Cadastrar
				</Button>
			</div>
			<div className="mt-2">
				<p>
					Já tem conta?{" "}
					<span onClick={() => setPage(true)} className="btn-criar-conta">
						Faça login!
					</span>
				</p>
			</div>
		</Form>
	);
};

export default SignUp;

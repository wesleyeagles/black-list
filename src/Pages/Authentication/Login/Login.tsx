import { Button, Form } from "react-bootstrap";
import CustomText from "../../../Components/FormInputs/CustomTextInput/CustomText";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./LoginSchema/LoginSchema";
import { useNavigate } from "react-router-dom";
import { useLoginLazyQuery } from "../../../GraphQL/generated";

interface ILoginProps {
	setPage: (page: boolean) => void;
	setUserToken: (token: string) => void;
}

const Login = ({ setPage, setUserToken }: ILoginProps) => {
	const { control, handleSubmit, setError } = useForm({
		resolver: zodResolver(loginSchema),
	});

	const navigate = useNavigate();

	const [getUser, { loading, data, error }] = useLoginLazyQuery();

	// Arrumar tipagem da "data" depois
	const onSubmit = (response: any) => {
		const toastId = toast.loading("Autenticando, aguarde...", {
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

		console.log(typeof getUser);

		getUser({
			variables: {
				login: response.login,
			},
			onCompleted: (res) => {
				if (res.account) {
					if (res.account.password === response.password) {
						toast.update(toastId, {
							type: toast.TYPE.SUCCESS,
							position: "top-right",
							autoClose: 5000,
							render: "Autenticação efetuada com sucesso!",
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							isLoading: false,
							progress: undefined,
							theme: "colored",
						});
						setUserToken(res.account.id);
						navigate("/");
					} else {
						toast.update(toastId, {
							type: toast.TYPE.ERROR,
							position: "top-right",
							autoClose: 5000,
							render: "Senha incorreta!",
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							isLoading: false,
							progress: undefined,
							theme: "colored",
						});

						setError("password", {
							message: "Senha incorreta",
						});
					}
				} else {
					toast.update(toastId, {
						type: toast.TYPE.ERROR,
						position: "top-right",
						autoClose: 5000,
						render: "Email de usuário não encontrado!",
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						progress: undefined,
						theme: "colored",
					});
					setError("login", {
						message: "Email de usuário não encontrado",
					});
				}
			},
		});
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<CustomText label="Email" name="login" placeholder="usuario@gmail.com" control={control} />
			<CustomText label="Senha" type="password" name="password" placeholder="*********" control={control} />
			<div className="d-flex justify-content-end">
				<a href="">Esqueceu sua senha?</a>
			</div>
			<div className="d-flex justify-content-center mt-4">
				<Button className="btn-login" type="submit">
					Entrar
				</Button>
			</div>
			<div className="mt-2">
				<p>
					Ainda não tem uma conta?{" "}
					<span onClick={() => setPage(false)} className="btn-criar-conta">
						Criar conta!
					</span>
				</p>
			</div>
		</Form>
	);
};

export default Login;

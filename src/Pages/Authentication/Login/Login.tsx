import { Button, Form } from "react-bootstrap";
import "./scss/Login.scss";
import CustomText from "../../../Components/FormInputs/CustomTextInput/CustomText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "./LoginSchema/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useLogin } from "./Queries/LoginQuery";
import { toast } from "react-toastify";
import { useAuthenticated } from "./Lib/Hooks/useAuthenticated";
import { useEffect } from "react";

const Login = () => {
	const { control, handleSubmit, setError } = useForm({
		resolver: zodResolver(loginSchema),
	});

	const { setUserToken, token, setAuthenticated, authenticated } = useAuthenticated();
	const navigate = useNavigate();

	const [getUser] = useLazyQuery(useLogin);

	useEffect(() => {
		if (typeof token === "string") {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	}, []);

	useEffect(() => {
		if (authenticated) {
			toast.success("Usuário já autenticado anteriormente!", {
				type: toast.TYPE.SUCCESS,
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				isLoading: false,
				progress: undefined,
				theme: "colored",
			});

			navigate("/");
		}
	}, [authenticated]);

	// Arrumar tipagem da "data" depois
	const onSubmit = async (data: any) => {
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

		await getUser({
			variables: {
				login: data.login,
			},
			onCompleted: (res) => {
				if (res.account) {
					if (res.account.password === data.password) {
						console.log(res);
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
						console.log("Senha incorreta");
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
					console.log("Email de usuário não encontrado");
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
		<div className="login-wrapper">
			<div className="container">
				<div className="login-box">
					<div className="login-box-text">
						<h1>Blacklist</h1>
						<div>
							<p>
								Todos os dados sensiveis fornecidos pelo usuário são criptografados usando a tecnologia SHA1. Essa criptografia é feita pela Bcrypt, para mais informações acesse o link{" "}
								<a target="_blank" className="text-white" href="https://github.com/kelektiv/node.bcrypt.js" rel="noreferrer">
									Bcrypt
								</a>
							</p>
						</div>
					</div>
					<div className="form-box">
						<h1>Bem Vindo</h1>
						<p>Faça login em sua conta para continuar</p>

						<div>
							<Form onSubmit={handleSubmit(onSubmit)}>
								<CustomText label="Email" name="login" control={control} />
								<CustomText label="Senha" type="password" name="password" control={control} />
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
										<span>
											<Link to="/criar-conta">Criar conta!</Link>
										</span>
									</p>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

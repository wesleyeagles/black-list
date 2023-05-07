import "./scss/Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthenticated } from "./Lib/Hooks/useAuthenticated";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import SignUp from "../SignUp/SignUp";
import Login from "./Login";

const Authentication = () => {
	const { setUserToken, token, setAuthenticated, authenticated } = useAuthenticated();
	const navigate = useNavigate();
	const [page, setPage] = useState(true);

	const { x } = useSpring({
		x: !page ? -300 : 0,
	});

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

	return (
		<div className="login-wrapper">
			<div className="container">
				<div className={`login-box ${page ? "justify-content-start" : "justify-content-end"}`}>
					<div className={`login-box-text ${page ? "opacity-1" : "opacity-0"}`}>
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
					<div className={`login-box-text ${page ? "opacity-0" : "opacity-1"}`}>
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
					<animated.div style={{ x }} className="form-box">
						{page ? (
							<div>
								<h1>Bem Vindo</h1>
								<p>Faça login em sua conta para continuar</p>

								<div>
									<Login setPage={setPage} setUserToken={setUserToken} />
								</div>
							</div>
						) : (
							<div>
								<h1>Cadastrar</h1>
								<p>Faça cadastro de sua conta para acessar o sistema</p>

								<div>
									<SignUp setPage={setPage} />
								</div>
							</div>
						)}
					</animated.div>
				</div>
			</div>
		</div>
	);
};

export default Authentication;

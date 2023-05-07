import { Link } from "react-router-dom";
import "./Navbar.scss";
import { Button } from "react-bootstrap";
import useUserInfo from "../../Hooks/useUserInfo";
import useNavbar from "./Hooks/useNavbar";
import CadastrarPersonagem from "./Personagem/Pages/Cadastrar.Personagem";

interface INavbarProps {
	page: number;
	setPage: (page: number) => void;
}

const Navbar = ({ page, setPage }: INavbarProps) => {
	const { data } = useUserInfo();

	const { showPersonagemModal, setShowPersonagemModal } = useNavbar();

	console.log(data);

	return (
		<div className="navbar-container">
			<div className="navbar-wrapper">
				<div className="navigation">
					<div className="rf-logo">
						<Link to="/">
							<img src="./rf-online-logo.png" />
						</Link>
					</div>
					<div className="links">
						<Link onClick={() => setPage(0)} className={`${page === 0 ? "selected-link" : null}`} to="/">
							Inicio
						</Link>
						<Link onClick={() => setPage(1)} className={`${page === 1 ? "selected-link" : null}`} to="/membros">
							Ver Membros
						</Link>
						<Link onClick={() => setPage(2)} className={`${page === 2 ? "selected-link" : null}`} to="/pontos">
							Ver Pontos
						</Link>
						{data ? (
							data.account.members.length <= 0 ? (
								<Button onClick={() => setShowPersonagemModal(true)}>Criar Personagem</Button>
							) : (
								<Button onClick={() => setShowPersonagemModal(true)}>Editar Personagem</Button>
							)
						) : null}
					</div>
				</div>

				<div className="navbar-user">
					<div className="d-flex flex-column align-items-center">
						<Link onClick={() => setPage(4)} className={`${page === 4 ? "selected-link" : null}`} to="/area-administrativa">
							Área Administrativa
						</Link>
						{data ? <small className="text-white">{data.account.login}</small> : null}
					</div>
					<div className="user-photo"></div>
				</div>
			</div>
			<CadastrarPersonagem show={showPersonagemModal} setShow={setShowPersonagemModal} />
		</div>
	);
};

export default Navbar;

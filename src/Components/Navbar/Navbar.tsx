import { Link } from "react-router-dom";
import "./Navbar.scss";
import { Button, Dropdown } from "react-bootstrap";
import useUserInfo from "../../Hooks/useUserInfo";
import useNavbar from "./Hooks/useNavbar";
import CadastrarPersonagem from "./Personagem/Pages/Cadastrar.Personagem";
import EditaPersonagem from "./Personagem/Pages/Editar.Personagem";
import { useGetMembersQuery } from "../../GraphQL/generated";

interface INavbarProps {
	page: number;
	setPage: (page: number) => void;
}

const Navbar = ({ page, setPage }: INavbarProps) => {
	const { data } = useUserInfo();

	const { data: members } = useGetMembersQuery();

	const { showPersonagemModal, setShowPersonagemModal, setShowEditPersonagemModal, showEditPersonagemModal } = useNavbar();

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
						<Link onClick={() => setPage(2)} className={`${page === 2 ? "selected-link" : null}`} to="/pontos">
							Ver Pontos
						</Link>
						{data ? (
							data.account.members.length <= 0 ? (
								<Button onClick={() => setShowPersonagemModal(true)}>Criar Personagem</Button>
							) : (
								<Button onClick={() => setShowEditPersonagemModal(true)}>Editar Personagem</Button>
							)
						) : null}
					</div>
				</div>

				<div className="navbar-user">
					<div className="d-flex flex-column align-items-center">{data ? <small className="text-white">{data.account.login}</small> : null}</div>
					<Dropdown>
						<Dropdown.Toggle className="p-0 m-0 togglex">
							<div className="user-photo"></div>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => localStorage.clear()} className="text-dark" href="/login">
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<CadastrarPersonagem show={showPersonagemModal} setShow={setShowPersonagemModal} />
			<EditaPersonagem show={showEditPersonagemModal} setShow={setShowEditPersonagemModal} />
		</div>
	);
};

export default Navbar;

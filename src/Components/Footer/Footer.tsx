import { Link } from "react-router-dom";
import "./Footer.scss";

interface IFooterProps {
	page: number;
	setPage: (page: number) => void;
}

const Footer = ({ page, setPage }: IFooterProps) => {
	return (
		<div className="footer">
			<div className="copyright">
				<span>2023 - Todos Direitos Reservados</span>
			</div>

			<div className="navigation">
				<a target="_blank" href="https://discord.gg/xGvY5Xth" rel="noreferrer">
					Discord
				</a>
				<Link onClick={() => setPage(3)} className={`${page === 3 ? "selected-link" : null}`} to="/servidor">
					Jogando Atualmente
				</Link>
				<Link to="/regras">Regras</Link>
			</div>

			<div className="rights">
				<span>
					Desenvolvido por: Wesley Carvalho (IGN: <span className="fw-bold">Assassino</span>)
				</span>
			</div>
		</div>
	);
};

export default Footer;

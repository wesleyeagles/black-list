import "react-toastify/dist/ReactToastify.css";
import "./Form.scss";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Accordion, ToastContainer } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthenticated } from "../Authentication/Login/Lib/Hooks/useAuthenticated";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import DataTable from "react-data-table-component";
import { useGetMembersQuery } from "../../GraphQL/generated";
// Mutations

const Main = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [urlState, setUrlState] = useState(false);
	const { data } = useGetMembersQuery();

	const { token } = useAuthenticated();

	console.log(data);

	const columns = [
		{
			name: "Nickname",
			selector: (row: any) => row["nickname"],
		},
		{
			name: "Level",
			selector: (row: any) => row["level"],
		},
		{
			name: "Classe",
			selector: (row: any) => {
				if (row.idClass === 1) {
					return <img width={30} alt="Mercenary" src="./punisher.gif" />;
				} else if (row.idClass === 2) {
					return <img width={30} alt="Punisher" src="./assaulter.gif" />;
				} else if (row.idClass === 3) {
					return <img width={30} src="./mercenary.gif" />;
				} else if (row.idClass === 4) {
					return <img width={30} src="./striker.gif" />;
				} else if (row.idClass === 5) {
					return <img width={30} src="./dementer.gif" />;
				} else if (row.idClass === 6) {
					return <img width={30} src="./scout.gif" />;
				} else if (row.idClass === 7) {
					return <img width={30} src="./scientist.gif" />;
				} else if (row.idClass === 8) {
					return <img width={30} src="./battleleader.gif" />;
				} else if (row.idClass === 9) {
					return <img width={30} src="./berserker.gif" />;
				} else if (row.idClass === 10) {
					return <img width={30} src="./armsman.gif" />;
				} else if (row.idClass === 11) {
					return <img width={30} src="./shieldmiller.gif" />;
				}
			},
		},
	];

	useEffect(() => {
		if (typeof token != "string") {
			toast.info("Usuário não autenticado, por favor faça o login!", {
				type: toast.TYPE.INFO,
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				isLoading: false,
				progress: undefined,
				theme: "colored",
			});
			navigate("/login");
		}
	}, [token]);

	useEffect(() => {
		if (location.pathname === "/") {
			setUrlState(true);
		} else {
			setUrlState(false);
		}
		if (location.pathname === "/") {
			setPage(0);
		} else if (location.pathname === "/membros") {
			setPage(1);
		} else if (location.pathname === "/pontos") {
			setPage(2);
		}
	}, [location]);

	const [page, setPage] = useState(0);

	return (
		<div className="container-wrapper">
			<ToastContainer
				className={"react-toastify"}
				style={{
					top: "80px",
				}}
			/>
			<div className="main">
				<Navbar setPage={setPage} page={page} />
				<>
					{urlState ? (
						<>
							<div className="main-wrapper">
								<div className="news">
									<div className="tabs d-flex align-items-center">
										<div className="w-100">
											<Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
												<Tab eventKey="home" title="Noticias">
													<Accordion>
														<Accordion.Item eventKey="1">
															<Accordion.Header>
																<div className="news-title">Estão liberadas as doações!</div>
																<div className="news-date">[08/05/2023]</div>
															</Accordion.Header>
															<Accordion.Body>
																<p>A partir de agora, estão liberadas as doações!!! Juntamente com isso, chegaram os nossos pacotes de pré-venda!!!</p>
																<p>Informações completas estão na sala #cashbr do discord. O resumo aqui:</p>
																<p>O valor de cash recebido por doações é:</p>

																<p>
																	<ul className="m-0 px-4 mt-1">
																		<li>1 dólar (1 USDT) = 1000 cash</li>
																		<li>5 reais (R$ 5,00) = 1000 cash</li>
																	</ul>
																</p>
																<p>Porém, teremos vários cupons de descontos pra quem comprar antes da abertura do server!!!</p>
																<p>Cupons:</p>
																<p>
																	<ul className="m-0 px-4 mt-1">
																		<li>VOID20 - 20% de desconto, disponível para 50 utilizações</li>
																		<li>VOID15 - 15% de desconto, disponível para 50 utilizações</li>
																		<li>VOID10 - 10% de desconto, disponível para 100 utilizações</li>
																	</ul>
																</p>
																<p>
																	<b>Para doações, basta logar em nosso painel com os mesmos dados do jogo:</b>
																	<br />
																	<a href="https://rfvoid.4funbr.net/painel/">https://rfvoid.4funbr.net/painel/</a>
																</p>
																<p>Aceitaremos também doações em USDT, na metamask, na rede BSC.</p>
																<p>Essa será a nossa carteira de recebimento:</p>
																<p>
																	<ul className="m-0 px-4 mt-1">
																		<li>Metamask </li>
																		<li>Binance Smart Chain</li>
																		<li>Carteira: 0xd5fafF4Df7f49F846BeE748aa5975c76F3160Fa2</li>
																	</ul>
																</p>
																<p>
																	<b>Todas as doações realizadas pela metamask serão 20% mais baratas, ou seja:</b>
																</p>
																<p>
																	<ul className="m-0 px-4 mt-1">
																		<li>0,80 dólar (0,80 USDT) = 1000 cash</li>
																		<li>4 reais (R$4,00) = 1000 cash</li>
																	</ul>
																</p>
																<p>Os desconto pra quem doar antes da abertura é acumulativo com o desconto de doações via metamask.</p>
																<p>Para dúvidas com relação a metamask, veja nosso ⁠guia-metamask, ou entre em contato.</p>
																<p>E aqui estão nossos pacotes de pré venda!!! </p>
																<p>Todos os capacetes começam podendo ser utilizados no level 1, com a defesa do level 41. </p>
																<p>
																	<ul className="m-0 px-4 mt-1">
																		<li>T1 - +0,5 movespeed</li>
																		<li>T2 - +10% HP (cumulativo)</li>
																		<li>T3 - +10% ataque (cumulativo)</li>
																	</ul>
																</p>
																<p>
																	Todos eles podem ser upados no level 50 (e depois level 55) e se transformam em um capacete SP do 50, da classe escolhida, sem
																	perder os bonus anterioes e recebendo os bonus normais de cada classe.
																</p>
																<p>
																	<img className="w-100" src="./packagesales.png" />
																</p>
															</Accordion.Body>
														</Accordion.Item>
														<Accordion.Item eventKey="0">
															<Accordion.Header>
																<div className="news-title">Finalmente temos uma data de abertura!</div>
																<div className="news-date">[07/05/2023]</div>
															</Accordion.Header>
															<Accordion.Body>
																<p>
																	Na sexta-feira, dia <b>12/05</b> será nossa abertura oficial do servidor, e, novamente, cheia de eventos!!
																</p>

																<p>
																	<ul className="m-0 px-4 mt-1">
																		<li>Top level</li>
																		<li>Top CP</li>
																		<li>Primeiros nicks a serem criados </li>
																		<li>Sorteios de cash</li>
																		<li>Sorteios de USDT</li>
																	</ul>
																</p>
																<p>
																	O server vai estar aberto <b>SEM MONSTROS</b> às 19h no horário de Brasilia. <b>O servidor começará de verdade as 20h</b>, quando os
																	monstros nascerem. Teremos recompensas não só em cash, mas diretamente em dólares (USDT). Os critérios para premiação e as
																	recompensas serão anunciados em breve!
																</p>
																<p>
																	<b>Pra ter certeza que você vai conseguir jogar sem problemas, nós vamos anunciar um client novo em breve</b>
																</p>
																<p>
																	<img className="w-100" src="./GrandOpening.png" />
																</p>
															</Accordion.Body>
														</Accordion.Item>
													</Accordion>
												</Tab>
												<Tab eventKey="profile" title="Eventos">
													2
												</Tab>
											</Tabs>
										</div>
									</div>
								</div>
								{data ? (
									<div className="logs">
										<div className="personagens">Ultimos personagens criados</div>
										<DataTable data={data.members} columns={columns} striped />
									</div>
								) : null}
							</div>
						</>
					) : null}
				</>
				<Outlet />
				<div className="discord-widget">
					<iframe
						src="https://discord.com/widget?id=1032261789821444116&theme=dark&disableCache=1"
						width="350"
						height="630"
						sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
					></iframe>
				</div>
				<Footer setPage={setPage} page={page} />
			</div>
		</div>
	);
};

export default Main;

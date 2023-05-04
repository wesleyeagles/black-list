import "react-toastify/dist/ReactToastify.css";
import "./Form.scss";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Carousel, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Mutations

const Main = () => {
	const location = useLocation();
	const [urlState, setUrlState] = useState(false);

	useEffect(() => {
		if (location.pathname === "/") {
			setUrlState(true);
		} else {
			setUrlState(false);
		}
	}, [location]);

	return (
		<>
			<ToastContainer
				className={"react-toastify"}
				style={{
					top: "80px",
				}}
			/>
			<div className="main">
				<div className="header">
					<div className="navigation">
						<Link to="/">Inicio</Link>
						<Link to="/criar-membro">Cadastrar membro</Link>
						<Link to="/membros">Ver membros</Link>
					</div>
				</div>
				{urlState ? (
					<div className="inicio">
						<div className="inicio-1">
							<div className="title">
								<h2>Guild Blacklist</h2>
								<p>Sistema em desenvolvimento para utilização no RF Online</p>
							</div>
							<div className="info-guild">
								<h2>Informações sobre a guild</h2>
								<p>
									No momento estamos aguardando a abertura do servidor{" "}
									<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info" rel="noreferrer">
										RF Void
									</a>
									, que se encontra em BETA aberto, ao lado e abaixo vai ter algumas informações sobre o servidor
								</p>
							</div>

							<div className="server-info">
								<h2>Server Info</h2>
								<ul>
									<li>Level Cap: 55</li>
									<li>Exp: 5x | 6x</li>
									<li>PT/SKILL: 12x | 15x</li>
									<li>Animus Rate: 15x | 18x </li>
									<li>Drop Rate: 3x | 4x</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info/readme" rel="noreferrer">
											Cash Auction House
										</a>{" "}
										✔️
									</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info/gem-socketing-system" rel="noreferrer">
											Gem Socketing System
										</a>{" "}
										✔️
									</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info/character-auction" rel="noreferrer">
											Character Auction
										</a>{" "}
										✔️
									</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info/battle-pass" rel="noreferrer">
											Battle Pass
										</a>{" "}
										✔️
									</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info/jewelry-crafting" rel="noreferrer">
											Jewelry Crafting
										</a>{" "}
										✔️
									</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/about-rf-void/server-info/calendar" rel="noreferrer">
											Calendar
										</a>{" "}
										✔️
									</li>
									<li>
										<a target="_blank" href="https://whitepaper.rf-void.com/server-changes/quality-of-life-and-fixes/gear-and-crafts" rel="noreferrer">
											New Crafts
										</a>{" "}
										✔️
									</li>
								</ul>
							</div>
						</div>
						<div>
							<h2>Droplist</h2>
							<div className="droplist-images">
								<Carousel className="custom-carousel">
									<Carousel.Item>
										<img className="d-block carousel-img" src="./HQDroplist.png" alt="First slide" />
									</Carousel.Item>
									<Carousel.Item>
										<img className="d-block carousel-img" src="./SetteDroplist.png" alt="Second slide" />
									</Carousel.Item>
									<Carousel.Item>
										<img className="d-block carousel-img" src="./CaldDroplist.png" alt="Third slide" />
									</Carousel.Item>
									<Carousel.Item>
										<img className="d-block carousel-img" src="./ElanDroplist.png" alt="Third slide" />
									</Carousel.Item>
									<Carousel.Item>
										<img className="d-block carousel-img" src="./CragDroplist.png" alt="Third slide" />
									</Carousel.Item>
									<Carousel.Item>
										<img className="d-block carousel-img" src="./BMDroplist.png" alt="Third slide" />
									</Carousel.Item>
								</Carousel>
							</div>
						</div>
					</div>
				) : null}
				<Outlet />
				<div className="footer">Em Desenvolvimento</div>
			</div>
		</>
	);
};

export default Main;

import DataTable from "react-data-table-component";
import { useGetLogPontosQuery, useGetMembersQuery, useTopThreePontosQuery } from "../../GraphQL/generated";
import { Button } from "react-bootstrap";
import "./Pontos.scss";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import ModalPontos from "./ModalPontos";
import ModalCadastro from "./ModalCadastro";

const Pontos = () => {
	const { data } = useGetMembersQuery();
	const { data: TopThree } = useTopThreePontosQuery();
	const { data: logPontos } = useGetLogPontosQuery();

	const [nickname, setNickname] = useState("");
	const [show, setShow] = useState(false);
	const [showCadastro, setShowCadastro] = useState(false);

	const columns = [
		{
			name: "Nickname",
			selector: (row: any) => row["nickname"],
			width: "60%",
			sortable: true,
		},
		{
			name: "Pontos",
			selector: (row: any) => row["pontos"],
			sort: true,
			width: "auto",
			sortable: true,
		},
		{
			name: "Visualizar",
			selector: (row: any) => (
				<div className="px-3">
					<AiFillEye
						role="button"
						onClick={() => {
							setNickname(row.nickname);
							setShow(true);
						}}
						size={20}
					/>
				</div>
			),
			width: "auto",
			className: "text-center",
		},
	];

	const topThreeColumn = [
		{
			name: "Nickname",
			selector: (row: any) => row["nickname"],
			width: "",
		},
		{
			name: "Raça",
			selector: (row: any) => {
				if (row.idRace === 0) {
					return <img width={30} alt="accretia" src="./accretia.png" />;
				} else if (row.idRace === 1) {
					return <img width={30} alt="bellato" src="./bellato.png" />;
				} else if (row.idClass === 2) {
					return <img width={30} src="./cora.png" />;
				}
			},
		},
		{
			name: "Level",
			selector: (row: any) => row["level"],
			width: "",
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
		{
			name: "Pontos",
			selector: (row: any) => row["pontos"] + 1000,
			sort: true,
		},
	];

	const columnsLog = [
		{
			name: "Nickname",
			selector: (row: any) => row["nickname"],
			width: "17%",
		},
		{
			name: "Ação",
			selector: (row: any) => (row["idAcao"] === 1 ? "PB Blink" : null),
			width: "15%",
		},
		{
			name: "Adicionou",
			selector: (row: any) => row["ponto"].toFixed(2).replace(".", ",") + " Pontos",
			width: "17%",
		},
		{
			name: "Mensagem",
			selector: (row: any) => row["mensagem"],
			width: "28%",
		},
		{
			name: "Horário",
			selector: (row: any) => new Date(row["createdAt"]).toLocaleString(),
			width: "auto",
		},
	];

	return (
		<>
			<div className="pontos-wrapper">
				<div className="logs">
					<Button onClick={() => setShowCadastro(true)} className="mb-2">
						Cadastrar Pontos
					</Button>
					<div className="d-flex gap-4">
						{data ? (
							<div className="pontos">
								<DataTable
									responsive
									data={data.members}
									columns={columns}
									striped
									pagination
									paginationComponentOptions={{ rowsPerPageText: "Linhas por página" }}
									paginationRowsPerPageOptions={[10]}
									highlightOnHover
								/>
							</div>
						) : null}
						{data ? (
							<div className="log-pontos d-flex flex-column justify-content-between">
								<div>
									<div className="title">Ultimas atualizações</div>
									<DataTable data={logPontos?.logPontos} responsive columns={columnsLog} striped />
								</div>
								<div>
									<div className="title">Top 3 Pontos</div>
									{TopThree ? <DataTable data={TopThree?.members} responsive columns={topThreeColumn} striped /> : null}
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<ModalPontos nickname={nickname} show={show} setShow={setShow} />
			<ModalCadastro show={showCadastro} setShow={setShowCadastro} />
		</>
	);
};

export default Pontos;

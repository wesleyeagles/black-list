import { useQuery } from "@apollo/client";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Members = () => {
	return <div>Teste</div>;
	//
	const columns = [
		{
			name: "Nickname",
			selector: (row: any) => row["nickname"],
		},
		{
			name: "Classe",
			selector: (row: any) => {
				if (row.class === "Tanker") {
					return <img className="class-icon" alt="Mercenary" src="./mercenary.gif" />;
				} else if (row.class === "Punisher") {
					return <img className="class-icon" alt="Punisher" src="./punisher.gif" />;
				} else if (row.class === "Striker") {
					return <img className="class-icon" src="./striker.gif" />;
				} else if (row.class === "Trapper") {
					return <img className="class-icon" src="./scout.gif" />;
				} else if (row.class === "Spec") {
					return <img className="class-icon" src="./scientist.gif" />;
				}
			},
		},
		{
			name: "Discord ID",
			selector: (row: any) => row["discordId"],
		},
		{
			name: "Cargo",
			selector: "cargo",
		},
		{
			name: "PT Principal",
			selector: (row: any) => {
				if (row.playOnOpen) {
					return <div className="text-center">Sim</div>;
				} else {
					return <div>Não</div>;
				}
			},
		},
		{
			name: "Ações",
			width: "80px",
			selector: (row: any) => {
				return (
					<Link to={`/editar-membro/${row.nickname}`}>
						<FaEdit size={20} />
					</Link>
				);
			},
		},
	];
	const { data } = useQuery(getMembers);
	const { data: punishers } = useQuery(getMembersPunisher);
	const { data: tankers } = useQuery(getMembersTanker);
	const { data: strikers } = useQuery(getMembersStriker);
	const { data: trappers } = useQuery(getMembersTrapper);
	const { data: specs } = useQuery(getMembersSpec);
	return (
		<>
			<div className="d-flex justify-content-center">
				<div className="data-table">
					{data ? (
						<DataTable
							paginationComponentOptions={{ rowsPerPageText: "Linhas por página" }}
							responsive
							striped
							paginationRowsPerPageOptions={[10]}
							highlightOnHover
							data={data.members}
							columns={columns}
							pagination
						/>
					) : null}
					<div className="class-count">
						{punishers ? (
							<div className="count">
								<img src="./punisher.gif" /> {punishers.members.length}
							</div>
						) : null}
						{tankers ? (
							<div className="count">
								<img src="./mercenary.gif" /> {tankers.members.length}
							</div>
						) : null}
						{strikers ? (
							<div className="count">
								<img src="./striker.gif" /> {strikers.members.length}
							</div>
						) : null}
						{trappers ? (
							<div className="count">
								<img src="./scout.gif" /> {trappers.members.length}
							</div>
						) : null}
						{specs ? (
							<div className="count">
								<img src="./scientist.gif" /> {specs.members.length}
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default Members;

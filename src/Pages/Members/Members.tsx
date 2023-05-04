import { useQuery } from "@apollo/client";
import DataTable from "react-data-table-component";
import { getMembers } from "../../Queries/getMembers";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Members = () => {
	const columns = [
		{
			name: "Nickname",
			selector: (row: any) => row["nickname"],
		},
		{
			name: "Classe",
			selector: (row: any) => {
				if (row.class === "Tanker") {
					return <img className="class-icon" alt="Mercenary" src="./public/mercenary.gif" />;
				} else if (row.class === "Punisher") {
					return <img className="class-icon" alt="Punisher" src="./public/punisher.gif" />;
				} else if (row.class === "Striker") {
					return <img className="class-icon" src="./public/striker.gif" />;
				} else if (row.class === "Trapper") {
					return <img className="class-icon" src="./public/scout.gif" />;
				} else if (row.class === "Spec") {
					return <img className="class-icon" src="./public/scientist.gif" />;
				}
			},
		},
		{
			name: "Discord ID",
			selector: (row: any) => row["discordId"],
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
	return (
		<div className="d-flex justify-content-center">
			<div className="data-table">{data ? <DataTable highlightOnHover data={data.members} columns={columns} pagination /> : null}</div>
		</div>
	);
};

export default Members;

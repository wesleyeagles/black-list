import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useGetLogsByNicknameQuery } from "../../GraphQL/generated";

interface iFormDatatableProps {
	nickname: string;
}

const ModalPontosDatatable = ({ nickname }: iFormDatatableProps) => {
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

	const { data } = useGetLogsByNicknameQuery({
		variables: {
			nickname: nickname,
		},
	});
	return (
		<Modal.Body>
			{data ? (
				<DataTable
					paginationComponentOptions={{ rowsPerPageText: "Linhas por página" }}
					responsive
					striped
					paginationRowsPerPageOptions={[10]}
					highlightOnHover
					pagination
					data={data.logPontos}
					columns={columnsLog}
					noDataComponent={() => <div>Nenhuma log encontrada</div>}
				/>
			) : null}
		</Modal.Body>
	);
};

export default ModalPontosDatatable;

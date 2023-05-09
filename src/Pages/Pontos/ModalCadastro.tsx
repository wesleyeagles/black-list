import { Modal } from "react-bootstrap";
import ModalCadastroForm from "./ModalCadastroForm";

interface iFormDatatableProps {
	show: boolean;
	setShow: (show: boolean) => void;
}

const ModalCadastro = ({ show, setShow }: iFormDatatableProps) => {
	return (
		<Modal size="lg" centered show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Cadastro de pontos</Modal.Title>
			</Modal.Header>
			<ModalCadastroForm setShow={setShow} />
		</Modal>
	);
};

export default ModalCadastro;

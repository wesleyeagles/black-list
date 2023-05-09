import { Modal } from "react-bootstrap";
import ModalPontosDatatable from "./ModalPontosDatatable";

interface iFormDatatableProps {
	nickname: string;
	show: boolean;
	setShow: (show: boolean) => void;
}

const ModalPontos = ({ nickname, show, setShow }: iFormDatatableProps) => {
	return (
		<Modal size="lg" centered show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Ultimas atualizações de {nickname}</Modal.Title>
			</Modal.Header>
			<ModalPontosDatatable nickname={nickname} />
		</Modal>
	);
};

export default ModalPontos;

import { Modal } from "react-bootstrap";
import PersonagemForm from "../PersonagemForm";

interface IPersonagemProps {
	show: boolean;
	setShow: (show: boolean) => void;
}

const EditaPersonagem = ({ show, setShow }: IPersonagemProps) => {
	const handleSubmit = () => {
		console.log("Nada");
	};
	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Informações do personagem</Modal.Title>
			</Modal.Header>
			<PersonagemForm setShow={setShow} onSubmit={handleSubmit} />
		</Modal>
	);
};

export default EditaPersonagem;

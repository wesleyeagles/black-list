import { useState } from "react";

const useNavbar = () => {
	const [showPersonagemModal, setShowPersonagemModal] = useState(false);
	const [showEditPersonagemModal, setShowEditPersonagemModal] = useState(false);

	return { setShowPersonagemModal, showPersonagemModal, setShowEditPersonagemModal, showEditPersonagemModal };
};

export default useNavbar;

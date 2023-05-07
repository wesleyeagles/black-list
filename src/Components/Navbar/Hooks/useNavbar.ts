import { useState } from "react";

const useNavbar = () => {
	const [showPersonagemModal, setShowPersonagemModal] = useState(false);

	return { setShowPersonagemModal, showPersonagemModal };
};

export default useNavbar;

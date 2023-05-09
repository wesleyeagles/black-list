import { Button, Form, Modal } from "react-bootstrap";
import CustomText from "../../FormInputs/CustomTextInput/CustomText";
import usePersonagemForm, { PersonagemHandleSubmitValues } from "./Hooks/usePersonagemForm";
import CustomSelect from "../../FormInputs/CustomSelectInput/CustomSelect";
import { accretiaClassesOptions, bellatoClassesOptions, coraClassesOptions, levelOptions, raceOptions } from "../../../Objects/Objects";
import { useState } from "react";
import CustomCheckbox from "../../FormInputs/CustomCheckbox/CustomCheckbox";
import CustomNumberInput from "../../FormInputs/CustomNumberInput/CustomNumber";
import { UseFormReturn } from "react-hook-form";

interface IPersonagemFormProps {
	setShow: (show: boolean) => void;
	defaultValues?: PersonagemHandleSubmitValues;
	onSubmit: (data: ReturnType<typeof usePersonagemForm>["methods"] extends UseFormReturn<infer U> ? U : any) => void;
}

const PersonagemForm = ({ setShow, onSubmit, defaultValues }: IPersonagemFormProps) => {
	const { methods } = usePersonagemForm({
		defaultValues,
	});

	const [race, setRace] = useState<any>(defaultValues ? defaultValues.idRace : undefined);

	return (
		<>
			<Form onSubmit={methods.handleSubmit(onSubmit)}>
				<Modal.Body className="form-grid">
					<div className="nickname">
						<CustomText label="Nickname *" control={methods.control} name="nickname" />
					</div>
					<div className="level">
						<CustomSelect isClearable={false} placeholder="Selecione seu level" options={levelOptions} label="Level" control={methods.control} name="level" />
					</div>
					<div className="race">
						<CustomSelect
							onChange={(val: any) => {
								if (val.value === 0) {
									setRace(0);
									if (race != 0) {
										methods.setValue("idClass", 1);
									}
								} else if (val.value === 1) {
									setRace(1);
									if (race != 1) {
										methods.setValue("idClass", 9);
									}
								} else {
									setRace(2);
									if (race != 2) {
										methods.setValue("idClass", 20);
									}
								}
							}}
							isClearable={false}
							placeholder="Selecione sua raça"
							options={raceOptions}
							label="Raça *"
							control={methods.control}
							name="idRace"
						/>
					</div>
					<div className="classe">
						<CustomSelect
							isClearable={false}
							noOptionsMessage={() => "Selecione uma raça primeiro"}
							placeholder="Selecione sua classe"
							options={race === 0 ? accretiaClassesOptions : race === 1 ? bellatoClassesOptions : race === 2 ? coraClassesOptions : undefined}
							label="Classe *"
							control={methods.control}
							name="idClass"
						/>
					</div>
					<div className="cpt">
						<CustomNumberInput decimalScale={0} prefix="CPT " canBeNull fixedDecimalScale placeholder="0,000" label="Pontos de Contribuição" control={methods.control} name="cpt" />
					</div>
					<div className="status">
						<CustomCheckbox label="Status" control={methods.control} name="memberStatus" />
					</div>
					<div className="abertura">
						<CustomCheckbox label="PT Principal" control={methods.control} name="playOnOpen" />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Cancelar
					</Button>
					<Button type="submit" variant="primary" onClick={() => console.log(methods.getValues())}>
						Salvar
					</Button>
				</Modal.Footer>
			</Form>
		</>
	);
};

export default PersonagemForm;

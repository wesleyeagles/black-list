import React, { ReactNode, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Control, FieldValues, Path } from "react-hook-form/dist/types";
import { Form } from "react-bootstrap";
import Select, { ActionMeta } from "react-select";
type SelectProps = Select extends (props: infer P) => any ? P : never;
interface ICustomSelectFieldProps<TFields extends FieldValues> extends SelectProps {
	name: Path<TFields>;
	control: Control<TFields>;
	label?: string;
	options?: any;
	placeholder?: string;

	GroupButton?: ReactNode;
}

const CustomSelect = <TFields extends FieldValues>({ name, control, label, GroupButton, options, placeholder, ...props }: ICustomSelectFieldProps<TFields>) => {
	return (
		<>
			<Form.Group controlId={name} className="form-group">
				<Form.Label>{label}</Form.Label>
				<Controller
					name={name}
					control={control}
					render={({ field: { onChange, name, onBlur, value }, fieldState }) => {
						const propOnChange = useCallback(
							(newVal: unknown, actionMeta: ActionMeta<unknown>) => {
								if (props.isMulti) {
									onChange((newVal as unknown[]).map((c: any) => c.value));
								} else {
									if (newVal == null) {
										onChange(null);
									} else {
										onChange((newVal as any)?.value);
									}
								}

								props.onChange?.(newVal, actionMeta);
							},
							[props.isMulti, props.onChange]
						);

						return (
							<>
								<Select
									{...props}
									value={options.find((c: any) => c.value === value)}
									defaultValue={value}
									isClearable
									onBlur={(e) => {
										onBlur();
										props.onBlur?.(e);
									}}
									onChange={propOnChange}
									options={options}
									placeholder={placeholder}
									name={name}
								/>
								<Form.Control.Feedback type="invalid" className="my-error">
									{fieldState.error?.message?.toString()}
								</Form.Control.Feedback>
							</>
						);
					}}
				/>
			</Form.Group>
		</>
	);
};

export default CustomSelect;

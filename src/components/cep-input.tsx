import { View, Text, TextInputProps } from "react-native";
import { Input } from "./input";
import { useState } from "react";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { CEP_REGEX, CEP_REGEX2 } from "@/utils/regex";

type CepInputProps = TextInputProps & {
  regex?: boolean;
};

export function CepInput({ value, onBlur, regex = false, ...rest }: CepInputProps) {
	const [error, setError] = useState("");

	const validateCep: TextInputProps["onBlur"] = (e) => {
		const cep = String(value ?? "");
		if (CEP_REGEX.test(cep) || CEP_REGEX2.test(cep) || cep === '') {
			setError("");
		} else {
			setError("CEP inválido");
		}
		onBlur?.(e);
	};

	return (
		<View>
			<Input
				{...rest}
				keyboardType="numeric"
				value={value}
				onBlur={validateCep}
			/>
			{error && regex ? (
				<Text style={globalStyles.errorText}>{error}</Text>
			) : null}
		</View>
	);
}

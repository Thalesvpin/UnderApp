import { View, Text, TextInputProps } from "react-native";
import { Input } from "./input";
import { useState } from "react";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { EMAIL_REGEX } from "@/utils/regex";

type EmailInputProps = TextInputProps & {
  regex?: boolean;
};

export function EmailInput({ value, onBlur, regex = false, ...rest }: EmailInputProps) {
	const [error, setError] = useState("");

	const validateEmail: TextInputProps["onBlur"] = (e) => {
		const email = String(value ?? "");
		if (EMAIL_REGEX.test(email)) {
			setError("");
		} else {
			setError("Email inválido");
		}
		onBlur?.(e);
	};

	return (
		<View>
			<Input
				{...rest}
				keyboardType="email-address"
				value={value}
				onBlur={validateEmail}
			/>
			{error && regex ? (
				<Text style={globalStyles.errorText}>{error}</Text>
			) : null}
		</View>
	);
}

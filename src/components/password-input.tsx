import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInputProps, TouchableOpacity, View } from "react-native";
import { Input } from "./input";
import { PASSWORD_REGEX } from "@/utils/regex";

type PasswordInputProps = TextInputProps & {
  regex?: boolean;
};

export function PasswordInput({ value, onBlur, secureTextEntry = true, regex = false, ...rest }: PasswordInputProps){
	const [hidePassword, setHidePassword] = useState(secureTextEntry);
	const [error, setError] = useState("");

	const validatePassword: TextInputProps["onBlur"] = (e) => {
		const password = String(value ?? "");
		if (PASSWORD_REGEX.test(password)) {
			setError("");
		}
		else {
			setError(
				"Senha deve conter:\n  *uma letra maiúscula\n  *uma letra minúscula\n  *um número",
			);
		}
		onBlur?.(e);
	}

	return (
		<View>
			<View>
				<Input
					secureTextEntry={hidePassword}
					value={value}
					onBlur={validatePassword}
					{...rest}
				/>
				{secureTextEntry && (
					<TouchableOpacity
						style={styles.icon}
						onPress={() => setHidePassword(!hidePassword)}
					>
						<Ionicons
							name={hidePassword ? "eye-off" : "eye"}
							size={20}
							color="gray"
						/>
					</TouchableOpacity>
				)}
			</View>
			{error && regex ? (
				<Text style={globalStyles.errorText}>{error}</Text>
			) : null}
		</View>

	)
}

const styles = {
	icon: {
		position: "absolute" as const,
		right: 10,
		top: "50%" as const,
		transform: [{ translateY: -18 }],
	},
}
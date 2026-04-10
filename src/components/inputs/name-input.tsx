import { TextInputProps } from "react-native";
import { Input } from "./input";
import { NAME_REGEX } from "@/utils/regex";

export function NameInput({ value, onChangeText: onChangeTextFromParent, ...rest }: TextInputProps) {
	
	const handleChangeText = (text: string) => {
		const onlyLetters = text.replace(NAME_REGEX, "");
		onChangeTextFromParent?.(onlyLetters);
	};

	return (
		<Input
			{...rest}
			value={value}
			onChangeText={handleChangeText}
		/>
	);
}

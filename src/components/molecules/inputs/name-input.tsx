import { EVERYTHING_BUT_LETTERS_REGEX } from "@/utils/regex";
import { TextInputProps } from "react-native";
import { Input } from "../../atoms/input";

export function NameInput({
  value,
  onChangeText: onChangeTextFromParent,
  ...rest
}: TextInputProps) {
  const handleChangeText = (text: string) => {
    const onlyLetters = text.replace(EVERYTHING_BUT_LETTERS_REGEX, "");
    onChangeTextFromParent?.(onlyLetters);
  };

  return <Input {...rest} value={value} onChangeText={handleChangeText} />;
}

import { globalStyles } from "@/stylesheets/global-stylesheet";
import { CEP_REGEX, EVERYTHING_BUT_NUMBERS_REGEX } from "@/utils/regex";
import { useState } from "react";
import { Text, TextInputProps, View } from "react-native";
import { Input } from "../../atoms/input";

type CepInputProps = TextInputProps & {
  regex?: boolean;
};

export function CepInput({
  value,
  onBlur,
  regex = false,
  onChangeText: onChangeTextFromParent,
  ...rest
}: CepInputProps) {
  const [error, setError] = useState("");

  const handleChangeText = (text: string) => {
    const onlyNumbers = text.replace(EVERYTHING_BUT_NUMBERS_REGEX, "");
    onChangeTextFromParent?.(onlyNumbers);
  };

  const validateCep: TextInputProps["onBlur"] = (e) => {
    const cep = String(value ?? "");
    if (CEP_REGEX.test(cep) || cep === "") {
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
        onChangeText={handleChangeText}
      />
      {error && regex ? (
        <Text style={globalStyles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

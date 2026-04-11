import { globalStyles } from "@/stylesheets/global-stylesheet";
import { EMAIL_REGEX } from "@/utils/regex";
import { useState } from "react";
import { Text, TextInputProps, View } from "react-native";
import { Input } from "../../atoms/input";

type EmailInputProps = TextInputProps & {
  regex?: boolean;
};

export function EmailInput({
  value,
  onBlur,
  regex = false,
  ...rest
}: EmailInputProps) {
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

import { View, Text } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function ForgotPassword() {
	return(
		<View>
			<Text>Email</Text>
			<Input placeholder='Insira seu email' keyboardType='email-address'/>
			<Button label='Enviar' />
		</View>
	)
}
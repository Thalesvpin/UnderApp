import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { PasswordInput } from "./password-input";
import { Button } from "./button";
import { useState } from "react";
import { EmailInput } from "./email-input";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	return(
		<View style={globalStyles.cardBg}>
			<View style={globalStyles.loginFields}>

				<View style={globalStyles.inputIcon}>
					<Ionicons name="mail" size={20} color="gray" />
					<Text>Email</Text>
				</View>
				<EmailInput value={email} onChangeText={setEmail} placeholder='Insira seu email' keyboardType='email-address'/>

				<View style={globalStyles.inputIcon}>
					<Ionicons name="lock-closed" size={20} color="gray" />
					<Text>Senha</Text>
				</View>
				<PasswordInput value={password} onChangeText={setPassword} placeholder='Insira sua senha'/>

				<Button label='Entrar' onPress={() => onSubmit(email, password)}/>

				<View style={[globalStyles.hCenter, styles.createAccountText]}>
					<Text>Não tem uma conta?</Text>
					<Link href="/signup" asChild><Text style={{color: '#007bff'}}>Crie uma agora</Text></Link>
				</View>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	createAccountText:{
		marginTop: 20,
	}
})
import { ScrollView, Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { useState } from "react";

export default function Signup(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpf, setCpf] = useState('');
	const [cep, setCep] = useState('');
	
	return(
		<KeyboardAvoidingView style={[{flex: 1}]} behavior={Platform.select({ios: 'padding', android: 'padding'})}>
			<ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
				<View style={globalStyles.loginSignupContainer}>
					<Image style={globalStyles.logo} source={require("@/assets/logo.png")} />
					<Text style={globalStyles.title}>Cadastro</Text>
					<View style={globalStyles.loginFields}>
						<Text>Email</Text>
						<Input value={email} onChangeText={setEmail} placeholder='Insira seu email' keyboardType='email-address'/>
						<Text>Senha</Text>
						<PasswordInput value={password} onChangeText={setPassword} placeholder='Crie uma senha'/>
						<Text>CPF</Text>
						<Input value={cpf} onChangeText={setCpf} placeholder='Insira seu CPF' keyboardType='numeric'/>
						<Text>CEP</Text>
						<Input value={cep} onChangeText={setCep} placeholder='Insira seu CEP' keyboardType='numeric'/>
						<Button label='Cadastrar' />
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({

})


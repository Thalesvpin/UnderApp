import { ScrollView, Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
					
					<View style={globalStyles.cardBg}>
						<View style={globalStyles.loginFields}>

							<View style={globalStyles.inputIcon}>
								<Ionicons name="mail" size={20} color="gray" />
								<Text>Email</Text>
							</View>
							<Input value={email} onChangeText={setEmail} placeholder='Insira seu email' keyboardType='email-address'/>
							
							<View style={globalStyles.inputIcon}>
								<Ionicons name="lock-closed" size={20} color="gray" />
								<Text>Senha</Text>
							</View>
							<PasswordInput value={password} onChangeText={setPassword} placeholder='Crie uma senha'/>
							
							<View style={globalStyles.inputIcon}>
								<Ionicons name="person" size={20} color="gray" />
								<Text>CPF</Text>
							</View>
							<Input value={cpf} onChangeText={setCpf} placeholder='Insira seu CPF' keyboardType='numeric'/>
							
							<View style={globalStyles.inputIcon}>
								<Ionicons name="location" size={20} color="gray" />
								<Text>CEP</Text>
							</View>
							<Input value={cep} onChangeText={setCep} placeholder='Insira seu CEP' keyboardType='numeric'/>
							<Button label='Cadastrar' />

						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({

})


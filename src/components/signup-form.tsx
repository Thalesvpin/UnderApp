import { View, Text } from "react-native";
import { Button } from "./button";
import { Input } from "./input";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { PasswordInput } from "./password-input";
import { useState } from "react";

type SignupFormProps = {
  onSubmit: (email: string, password: string, firstName: string, lastName: string, cep: string) => void;
}

export function SignupForm({ onSubmit }: SignupFormProps){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [cep, setCep] = useState('');
	// const [cpf, setCpf] = useState('');
	
	return(
		<View style={globalStyles.cardBg}>
			<View style={globalStyles.loginFields}>

				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>Nome</Text>
				</View>
				<Input value={firstName} onChangeText={setFirstName} placeholder='Insira seu nome'/>
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>Sobrenome</Text>
				</View>
				<Input value={lastName} onChangeText={setLastName} placeholder='Insira seu sobrenome'/>
				
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
				
				{/* <View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>CPF</Text>
				</View>
				<Input value={cpf} onChangeText={setCpf} placeholder='Insira seu CPF' keyboardType='numeric'/> */}
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="location" size={20} color="gray" />
					<Text>CEP</Text>
				</View>
				<Input value={cep} onChangeText={setCep} placeholder='Insira seu CEP' keyboardType='numeric'/>
				<Button label='Cadastrar' onPress={() => onSubmit(email, password, firstName, lastName, cep)} />

			</View>
		</View>
	)
}
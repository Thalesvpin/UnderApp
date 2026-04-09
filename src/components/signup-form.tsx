import { View, Text } from "react-native";
import { Button } from "./button";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { PasswordInput } from "./password-input";
import { useState } from "react";
import { EmailInput } from "./email-input";
import { CepInput } from "./cep-input";
import { NameInput } from "./name-input";
import { EMAIL_REGEX, CEP_REGEX, CEP_REGEX2, NAME_REGEX, PASSWORD_REGEX } from "@/utils/regex";

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
	
	const isFormValid = (() => {
		const emailValid = EMAIL_REGEX.test(email) && email !== '';
		const passwordValid = PASSWORD_REGEX.test(password) && password !== '';
		const firstNameValid = NAME_REGEX.test(firstName) && firstName !== '';
		const lastNameValid = NAME_REGEX.test(lastName) && lastName !== '';
		const cepValid = (CEP_REGEX.test(cep) || CEP_REGEX2.test(cep)) && cep !== '';
		return emailValid && passwordValid && firstNameValid && lastNameValid && cepValid;
	});

	return(
		<View style={globalStyles.cardBg}>
			<View style={globalStyles.loginFields}>

				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>Nome</Text>
				</View>
				<NameInput value={firstName} onChangeText={setFirstName} placeholder='Insira seu nome'/>
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>Sobrenome</Text>
				</View>
				<NameInput value={lastName} onChangeText={setLastName} placeholder='Insira seu sobrenome'/>
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="mail" size={20} color="gray" />
					<Text>Email</Text>
				</View>
				<EmailInput value={email} onChangeText={setEmail} placeholder='Insira seu email' keyboardType='email-address' regex={true} />
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="lock-closed" size={20} color="gray" />
					<Text>Senha</Text>
				</View>
				<PasswordInput value={password} onChangeText={setPassword} placeholder='Crie uma senha' regex={true} />
				
				{/* <View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>CPF</Text>
				</View>
				<Input value={cpf} onChangeText={setCpf} placeholder='Insira seu CPF' keyboardType='numeric'/> */}
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="location" size={20} color="gray" />
					<Text>CEP</Text>
				</View>
				<CepInput value={cep} onChangeText={setCep} placeholder='Insira seu CEP' keyboardType='numeric' regex={true} />
				<Button label='Cadastrar' disabled={!isFormValid()} onPress={() => isFormValid() && onSubmit(email, password, firstName, lastName, cep)} />

			</View>
		</View>
	)
}
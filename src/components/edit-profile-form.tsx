import { globalStyles } from "@/stylesheets/global-stylesheet";
import { CEP_REGEX, CEP_REGEX2, EMAIL_REGEX, NAME_REGEX } from "@/utils/regex";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";
import { CepInput } from "./inputs/cep-input";
import { EmailInput } from "./inputs/email-input";
import { NameInput } from "./inputs/name-input";
import { LoaderButton } from "./loader-button";

type EditProfileFormProps = {
	userInfo: {
		name: string;
		lastName: string;
		email: string;
		// cpf: string;
		cep: string;
	},
	onSubmit: (newUserInfo: {name: string, email: string, cpf: string, cep: string}) => void;
}
export function EditProfileForm({ userInfo, onSubmit }: EditProfileFormProps){
	const [newUserInfo, setNewUserInfo] = useState({name: '', lastName: '', email: '', cpf: '', cep: ''});
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		await onSubmit(newUserInfo);
		setIsLoading(false);
	}
	
	const isFormValid = (() => {
		const emailValid = EMAIL_REGEX.test(newUserInfo.email) && newUserInfo.email !== '';
		const nameValid = NAME_REGEX.test(newUserInfo.name) && newUserInfo.name !== '';
		const lastNameValid = NAME_REGEX.test(newUserInfo.lastName) && newUserInfo.lastName !== '';
		const cepValid = (CEP_REGEX.test(newUserInfo.cep) || CEP_REGEX2.test(newUserInfo.cep)) && newUserInfo.cep !== '';
		return emailValid && nameValid && lastNameValid && cepValid;
	});

	return(
		<View style={globalStyles.cardBg}>
			<View style={styles.formGroup}>
			
				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={22} color="gray" />
					<Text>Nome</Text>
				</View>
				<NameInput value={newUserInfo.name} onChangeText={(text) => setNewUserInfo({...newUserInfo, name: text})} placeholder="Nome" />

				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={22} color="gray" />
					<Text>Sobrenome</Text>
				</View>
				<NameInput value={newUserInfo.lastName} onChangeText={(text) => setNewUserInfo({...newUserInfo, lastName: text})} placeholder="Sobrenome" />
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="mail" size={22} color="gray" />
					<Text>Email</Text>
				</View>
				<EmailInput value={newUserInfo.email} onChangeText={(text) => setNewUserInfo({...newUserInfo, email: text})} placeholder="Email" keyboardType='email-address' regex={true} />
				
				{/* <View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>CPF</Text>
				</View>
				<Input value={newUserInfo.cpf} style={{color: 'gray'}} editable={false} placeholder='CPF do usuário' keyboardType='numeric'/> */}

				<View style={globalStyles.inputIcon}>
					<Ionicons name="location" size={20} color="gray" />
					<Text>CEP</Text>
				</View>
				<CepInput value={newUserInfo.cep} onChangeText={(text) => setNewUserInfo({...newUserInfo, cep: text})} placeholder='CEP do usuário' keyboardType='numeric' regex={true} />
				
				{/* <Button label="Salvar" /> */}

				<View style={globalStyles.hCenter}>
					<LoaderButton
						label="Salvar"
						loadingText="Salvando..."
						isLoading={isLoading}
						onPress={handleSubmit}
					></LoaderButton>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	formGroup: {
		width: '93%',
	}
});
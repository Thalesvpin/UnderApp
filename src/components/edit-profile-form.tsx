import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { EmailInput } from "./email-input";
import { CepInput } from "./cep-input";
import { NameInput } from "./name-input";

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
				
				<Button label="Salvar" />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	formGroup: {
		width: '93%',
	}
});
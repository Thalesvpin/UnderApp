import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

type EditProfileFormProps = {
	userInfo: {
		name: string;
		email: string;
		// cpf: string;
		cep: string;
	},
	onSubmit: (newUserInfo: {name: string, email: string, cpf: string, cep: string}) => void;
}
export function EditProfileForm({ userInfo, onSubmit }: EditProfileFormProps){
	const [newUserInfo, setNewUserInfo] = useState({name: '', email: '', cpf: '', cep: ''});
	
	return(
		<View style={globalStyles.cardBg}>
			<View style={styles.formGroup}>
			
				<View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={22} color="gray" />
					<Text>Nome</Text>
				</View>
				<Input value={newUserInfo.name} onChangeText={(text) => setNewUserInfo({...newUserInfo, name: text})} placeholder="Nome" />
				
				<View style={globalStyles.inputIcon}>
					<Ionicons name="mail" size={22} color="gray" />
					<Text>Email</Text>
				</View>
				<Input value={newUserInfo.email} onChangeText={(text) => setNewUserInfo({...newUserInfo, email: text})} placeholder="Email" keyboardType='email-address'/>
				
				{/* <View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>CPF</Text>
				</View>
				<Input value={newUserInfo.cpf} style={{color: 'gray'}} editable={false} placeholder='CPF do usuário' keyboardType='numeric'/> */}

				<View style={globalStyles.inputIcon}>
					<Ionicons name="location" size={20} color="gray" />
					<Text>CEP</Text>
				</View>
				<Input value={newUserInfo.cep} onChangeText={(text) => setNewUserInfo({...newUserInfo, cep: text})} placeholder='CEP do usuário' keyboardType='numeric'/>
				
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
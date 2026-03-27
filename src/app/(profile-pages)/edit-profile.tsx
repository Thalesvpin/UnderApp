import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from "react-native";


export default function EditProfile() {
	const [userInfo, setUserInfo] = useState({name: '', email: ''});
	
	async function getUserInfo() {
		console.log("Getting user info...");

		let username = await AsyncStorage.getItem('username');
		let email = await AsyncStorage.getItem('email');
		if(username && email){
			setUserInfo({name: username, email: email});
		}
	}

	async function saveUserInfo() {
		console.log("Saving user info...");
		await AsyncStorage.setItem('username', userInfo.name);
		await AsyncStorage.setItem('email', userInfo.email);
	}

	useEffect(() => {
		getUserInfo();
	}, []);

	return(
		<KeyboardAvoidingView style={[{flex: 1}, globalStyles.bgColor]} behavior={Platform.select({ios: 'padding', android: 'padding'})}>
			<ScrollView>
				<View style={styles.wrapper}>
					<View style={styles.formGroup}>
						<Text>Nome</Text>
						<Input value={userInfo.name} placeholder="Nome" />
						<Text>Email</Text>
						<Input value={userInfo.email} placeholder="Email" keyboardType='email-address'/>
						<Button label="Salvar" />
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	formGroup: {
		width: '70%',
	},
});
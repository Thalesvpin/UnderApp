import { Button } from "@/components/button";
import { Input } from "@/components/input";
import UserService from "@/services/user.service";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, Platform, Pressable, Image } from "react-native";


export default function EditProfile() {
	const [userInfo, setUserInfo] = useState({name: '', email: '', cpf: '', cep: '', profileImageUrl: ''});
	
	async function getUserInfo() {
		console.log("Getting user info...");

		UserService.getUserInfo().then(async (response) => {
			if (response.ok) {
				const {data} = await response.json();
				setUserInfo(data);
			}
		}).catch((error) => {
			console.error(error);
		});
	}

	async function saveUserInfo() {
		console.log("Saving user info...");
		await AsyncStorage.setItem('username', userInfo.name);
		await AsyncStorage.setItem('email', userInfo.email);
	}

	useEffect(() => {
		getUserInfo();
		console.log('aaa');
	}, []);

	return(
		<KeyboardAvoidingView style={[{flex: 1}, globalStyles.bgColor]} behavior={Platform.select({ios: 'padding', android: 'padding'})}>
			<ScrollView>
				<View style={styles.wrapper}>

					<View style={[globalStyles.avatarWrap, styles.avatarWrap]}>
						<Image
							style={globalStyles.profilePicture}
							source={userInfo.profileImageUrl ? {uri: userInfo.profileImageUrl} : require("@/assets/default-avatar.png")}
						/>
						<Pressable
							style={({ pressed }) => [
								globalStyles.editAvatarBtn,
								pressed && globalStyles.editAvatarBtnPressed,
							]}
							onPress={() => router.push("/edit-profile")}
							accessibilityRole="button"
							accessibilityLabel="Editar foto do perfil"
						>
							<Ionicons name="create-outline" size={22} color="#000000" />
						</Pressable>
					</View>
					<View style={globalStyles.cardBg}>
						<View style={styles.formGroup}>
						
							<View style={globalStyles.inputIcon}>
								<Ionicons name="person" size={22} color="gray" />
								<Text>Nome</Text>
							</View>
							<Input value={userInfo.name} onChangeText={(text) => setUserInfo({...userInfo, name: text})} placeholder="Nome" />
							<View style={globalStyles.inputIcon}>
								<Ionicons name="mail" size={22} color="gray" />
								<Text>Email</Text>
							</View>
							<Input value={userInfo.email} onChangeText={(text) => setUserInfo({...userInfo, email: text})} placeholder="Email" keyboardType='email-address'/>
							<View style={globalStyles.inputIcon}>
								<Ionicons name="person" size={20} color="gray" />
								<Text>CPF</Text>
							</View>
							<Input value={userInfo.cpf} style={{color: 'gray'}} editable={false} placeholder='CPF do usuário' keyboardType='numeric'/>
							<View style={globalStyles.inputIcon}>
								<Ionicons name="location" size={20} color="gray" />
								<Text>CEP</Text>
							</View>
							<Input value={userInfo.cep} onChangeText={(text) => setUserInfo({...userInfo, cep: text})} placeholder='CEP do usuário' keyboardType='numeric'/>
							<Button label="Salvar" />
						</View>
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
		width: '93%',
	},
	avatarWrap: {
		marginTop: 15,
	}
});
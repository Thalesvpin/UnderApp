import { EditProfileForm } from "@/components/edit-profile-form";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Platform, Pressable, Image } from "react-native";


export default function EditProfile() {
	const [userInfo, setUserInfo] = useState({name: '', email: '', cpf: '', cep: ''});
	
	async function getUserInfo() {
		console.log("Getting user info...");

		let username = await AsyncStorage.getItem('username');
		let email = await AsyncStorage.getItem('email');
		setUserInfo({name: 'Thales', email: 'thales@email.com', cpf: '137729996111', cep: ''});
		if(username && email){
			setUserInfo({name: username, email: email, cpf: '137729996111', cep: ''});
		}
	}

	async function saveUserInfo(newUserInfo: {name: string, email: string, cpf: string, cep: string}) {
		console.log("Saving user info...");
		await AsyncStorage.setItem('username', newUserInfo.name);
		await AsyncStorage.setItem('email', newUserInfo.email);
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
							source={require("@/assets/mordecai.png")}
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
					
					<EditProfileForm userInfo={userInfo} onSubmit={saveUserInfo} />
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
	avatarWrap: {
		marginTop: 15,
	}
});
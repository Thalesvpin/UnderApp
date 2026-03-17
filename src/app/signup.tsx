import { ScrollView, Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { globalStyles } from "@/stylesheets/global-stylesheet";

export default function Signup(){
	return(
		<KeyboardAvoidingView style={{flex: 1}} behavior={Platform.select({ios: 'padding', android: 'height'})}>
			<ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
				<View style={globalStyles.loginSignupContainer}>
					<Image style={globalStyles.logo} source={require("@/assets/logo.png")} />
					<Text style={globalStyles.title}>Cadastro</Text>
					<View style={globalStyles.loginFields}>
						<Text>Email</Text>
						<Input placeholder='Insira seu email' keyboardType='email-address'/>
						<Text>Senha</Text>
						<PasswordInput placeholder='Crie uma senha'/>
						<Button label='Cadastrar' />
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({

})


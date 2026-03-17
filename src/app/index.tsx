import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Link } from 'expo-router'
import { PasswordInput } from '@/components/password-input'
import { globalStyles } from '@/stylesheets/global-stylesheet'

export default function Index() {
	return(
		<KeyboardAvoidingView style={{flex: 1}} behavior={Platform.select({ios: 'padding', android: 'height'})}>
			<ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
				<View style={globalStyles.loginSignupContainer}>
					<Image style={globalStyles.logo} source={require("@/assets/logo.png")} />
					<Text style={globalStyles.title}>Login</Text>
					<View style={globalStyles.loginFields}>
						<Text>Email</Text>
						<Input placeholder='Insira seu email' keyboardType='email-address'/>
						<Text>Senha</Text>
						<PasswordInput placeholder='Insira sua senha'/>
						<Link href={"/profile"} asChild>
							<Button label='Entrar' onPress={signIn}/>
						</Link>
						<Link href="/forgot-password" style={{marginTop: 20, color: '#007bff'}}>Esqueceu sua senha?</Link>
					</View>
					<Link href="/signup" asChild>
						<Button label='Criar conta' style={styles.createAccount} />
					</Link>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

function signIn(){
	console.log('Signing in...')
}

const styles = StyleSheet.create({
	createAccount:{
		backgroundColor: '#909090',
		marginTop: 20,
	},
	forgotPassword:{
		width: '100%',
		justifyContent: 'flex-start',
	},
})
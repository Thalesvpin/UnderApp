import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Link, router } from 'expo-router'
import { PasswordInput } from '@/components/password-input'
import { globalStyles } from '@/stylesheets/global-stylesheet'
import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { AuthContext } from '@/utils/authContext'
import AuthService from '@/services/auth.service'
import { Ionicons } from '@expo/vector-icons'


function signIn(){
	console.log('Signing in...')
	
}

export default function Login() {
	const [isReady, setIsReady] = useState(false);
	const [userToken, setUserToken] = useState<string | null>(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);

	const checkUserLoggedIn = async () => {
		const token = await AsyncStorage.getItem('userToken')
		if (token !== null && token !== undefined) {
			setUserToken(JSON.parse(token));
			return JSON.parse(token);	
		}
		else{
			setUserToken(null);
			return null;
		}
	}

	useEffect(() => {
		(async () => {
			let token = null;
			await SplashScreen.preventAutoHideAsync();
			try {
				token = await checkUserLoggedIn();
				await SplashScreen.hideAsync();
				setIsReady(true);
				if(token !== null && token !== undefined){
					authContext.logIn();
					router.replace('/(tabs)');
				}
			}
			finally{
			}
		})();
	}, []);

	function handleSignIn(){
		console.log('Signing in...')
		authContext.logIn();
		router.replace('/(tabs)');
	}

	return(
		<KeyboardAvoidingView style={[{flex: 1}]} behavior={Platform.select({ios: 'padding', android: 'padding'})}>
			<ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
				<View style={globalStyles.loginSignupContainer}>
					
					<Image style={globalStyles.logo} source={require("@/assets/logo.png")} />
					<Text style={globalStyles.title}>Login</Text>
					
					<View style={globalStyles.cardBg}>
						<View style={globalStyles.loginFields}>

							<View style={globalStyles.inputIcon}>
								<Ionicons name="mail" size={20} color="gray" />
								<Text>Email</Text>
							</View>
							<Input value={email} onChangeText={setEmail} placeholder='Insira seu email' keyboardType='email-address'/>

							<View style={globalStyles.inputIcon}>
								<Ionicons name="lock-closed" size={20} color="gray" />
								<Text>Senha</Text>
							</View>
							<PasswordInput value={password} onChangeText={setPassword} placeholder='Insira sua senha'/>

							<Link href={"/(tabs)"} replace asChild>
								<Button label='Entrar' onPress={handleSignIn}/>
							</Link>

							<View style={[globalStyles.hCenter, styles.createAccountText]}>
								<Text>Não tem uma conta?</Text>
								<Link href="/signup" asChild><Text style={{color: '#007bff'}}>Crie uma agora</Text></Link>
							</View>

						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
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
	createAccountText:{
		marginTop: 20,
	}
})
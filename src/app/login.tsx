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

function test(){
	console.log('3 test function');
	
}

function signIn(){
	console.log('Signing in...')
	
}

export default function Login() {
	const [isReady, setIsReady] = useState(false);
	const [userToken, setUserToken] = useState<string | null>(null);

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
			// finally {
			// 	console.log('finally: ', userToken);
			// 	setIsReady(true);
			// 	await SplashScreen.hideAsync();
			// 	if(token !== null){
			// 		console.log('4');
			// 		router.replace('/(tabs)');
			// 	}
			// }
		})();
	}, []);

	return(
		<KeyboardAvoidingView style={[{flex: 1}, globalStyles.bgColor]} behavior={Platform.select({ios: 'padding', android: 'padding'})}>
			<ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
				<View style={globalStyles.loginSignupContainer}>
					<Image style={globalStyles.logo} source={require("@/assets/logo.png")} />
					<Text style={globalStyles.title}>Login</Text>
					<View style={globalStyles.loginFields}>
						<Text>Email</Text>
						<Input placeholder='Insira seu email' keyboardType='email-address'/>
						<Text>Senha</Text>
						<PasswordInput placeholder='Insira sua senha'/>
						<Link href={"/(tabs)"} replace asChild>
							<Button label='Entrar' onPress={authContext.logIn}/>
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
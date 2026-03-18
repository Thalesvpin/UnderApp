import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Link, router } from 'expo-router'
import { PasswordInput } from '@/components/password-input'
import { globalStyles } from '@/stylesheets/global-stylesheet'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

function test(){
	console.log('3 test function');
	
}

function signIn(){
	console.log('Signing in...')
}

export default function Index() {
	const [isReady, setIsReady] = useState(false);
	const [userToken, setUserToken] = useState<string | null>(null);

	const checkUserLoggedIn = async () => {
		console.log('2 quero isso');
		AsyncStorage.getItem('userToken')
			.then((token) => {
				if (token !== null) {
					setUserToken(JSON.parse(token));
				}
				else{
					setUserToken(null);
				}
			})
			.catch(error => {
				console.warn('Error checking user token:', error);
			})
		;
	}

	if(!isReady){
		console.log('1 dentro do if !isReady');
		return(
			<AppLoading 
				startAsync={checkUserLoggedIn}
				onFinish={() => {
					setIsReady(true);
					test();
				}}
				onError={console.warn}
			/>
		)
	}

	console.log('4 quando isso veio?');

	if(userToken !== null){
		router.replace('/(tabs)/map');
	}

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
						<Link href={"/profile"} replace asChild>
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
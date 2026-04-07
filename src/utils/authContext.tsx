import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
	isLoggedIn: boolean;
	isReady: boolean;
	logIn: (token: string) => void;
	logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
	isLoggedIn: false,
	isReady: false,
	logIn: () => {},
	logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
	const [isReady, setIsReady] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	
	const logIn = (token: string) => {
		SecureStore.setItemAsync('token', token);
		setIsLoggedIn(true);
		router.replace("/(tabs)");
	}
	
	const logOut = () => {
		SecureStore.deleteItemAsync('token');
		setIsLoggedIn(false);
		router.replace("/login");
	}

	useEffect(() => {
		const getAuthFromStorage = async () => {
			try{
				const token = await SecureStore.getItemAsync('token');
				if(token !== null && token !== undefined){
					setIsLoggedIn(true)
				}
			}
			catch(error){
				console.log('Error fetching auth state', error)
			}
			setIsReady(true);
		}
		getAuthFromStorage();
	}, []);

	return (
		<AuthContext.Provider 
			value={{ isReady, isLoggedIn, logIn, logOut }}
		>
			{children}
		</AuthContext.Provider>
	)
}
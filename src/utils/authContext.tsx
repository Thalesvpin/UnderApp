import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import UserService from "@/services/user.service";

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

	function isNonEmptyToken(token: string | null): token is string {
		return typeof token === "string" && token.trim().length > 0;
	}

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const token = await SecureStore.getItemAsync("token");
				if (!isNonEmptyToken(token)) {
					if (!cancelled) setIsLoggedIn(false);
					return;
				}
				await UserService.getUserInfo();
				if (!cancelled) setIsLoggedIn(true);
			} 
			catch {
				await SecureStore.deleteItemAsync("token");
				if (!cancelled) setIsLoggedIn(false);
			} 
			finally {
				if (!cancelled) setIsReady(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<AuthContext.Provider 
			value={{ isReady, isLoggedIn, logIn, logOut }}
		>
			{children}
		</AuthContext.Provider>
	)
}
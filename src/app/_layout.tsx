import { Stack } from "expo-router";

export default function Layout(){
	return(
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="signup" options={{ headerShown: false }} />
			<Stack.Screen name="forgot-password" options={{ title: 'Esqueci minha senha' }} />
		</Stack>
	)
}
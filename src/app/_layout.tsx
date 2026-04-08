import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/stylesheets/toast-styles";

export default function RootLayout(){
	return(
		<AuthProvider>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
					contentStyle: globalStyles.bgColor,
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="signup" options={{ headerShown: false }} />
			</Stack>
			<Toast config={toastConfig} />
		</AuthProvider>
	)
}
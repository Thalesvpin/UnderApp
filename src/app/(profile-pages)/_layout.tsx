import { colorBg } from "@/stylesheets/global-stylesheet";
import { toastConfig } from "@/stylesheets/toast-styles";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function ProfileLayout() {
  return (
		<>
			<GestureHandlerRootView>
				<Stack
					screenOptions={{
						animation: "slide_from_right",
					}}
				>
					<Stack.Screen
						name="edit-profile"
						options={{
							title: "Editar Perfil",
							headerTransparent: true,
							headerShadowVisible: false,
							headerTintColor: '#fff',
						}}
					/>
					<Stack.Screen
						name="manage-reports"
						options={{
							title: "Meus relatos",
						}}
					/>
				</Stack>
			</GestureHandlerRootView>
			<Toast config={toastConfig} />
		</>
		
  );
}

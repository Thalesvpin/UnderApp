import { colorBg } from "@/stylesheets/global-stylesheet";
import { toastConfig } from "@/stylesheets/toast-styles";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function ProfileLayout() {
  return (
		<>
			<Stack
				screenOptions={{
					animation: "slide_from_right",
				}}
			>
				<Stack.Screen 
					name="edit-profile"
					options={{
						title: "Editar Perfil",
						headerStyle: {
							backgroundColor: colorBg,
						},
						headerShadowVisible: false,
						headerTintColor: '#000',
					}}
				/>
				<Stack.Screen 
					name="manage-reports"
					options={{
						title: "Meus relatos",
					}}
				/>
			</Stack>
			<Toast config={toastConfig} />
		</>
		
  );
}

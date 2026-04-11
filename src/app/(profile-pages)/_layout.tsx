import { colorBg } from "@/stylesheets/global-stylesheet";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
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
  );
}

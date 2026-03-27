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

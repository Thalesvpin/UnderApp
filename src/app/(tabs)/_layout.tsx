import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout(){
	return(
		<Tabs>
			<Tabs.Screen 
				name="map" 
				options={{ 
					title: "Mapa",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="map" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="timeline"
				options={{ 
					title: "Linha do Tempo",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="time" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="add-report"
				options={{ 
					title: "Adicionar Relato", 
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="add" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{ 
					title: "Perfil",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
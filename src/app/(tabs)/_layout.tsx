import { CurvedBottomTabs } from "@/components/organisms/reactix/curved-bottom-tabs/curved-bottom-tabs";
import { AuthContext } from "@/utils/authContext";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabsLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
		<GestureHandlerRootView>
			<Tabs
				tabBar={(props) => (
					<CurvedBottomTabs {...props} gradients={["#4287f5", "#0d1b2a"]} />
				)}
			>
				<Tabs.Screen
					name="index"
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
		</GestureHandlerRootView>
  );
}

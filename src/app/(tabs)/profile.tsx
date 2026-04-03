import { Button } from "@/components/button";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ClickableCard } from "@/components/clickable-card";

export default function Profile() {
	const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');

	async function getUsername() {
		let username = await AsyncStorage.getItem('username');
		if(username){
			setUsername(username);
		}
	}

  function logOut() {
		console.log("Loging out...");
		authContext.logOut();
		AsyncStorage.removeItem("userToken");
  }

	function addToken() {
		console.log("Adding token...");
		AsyncStorage.setItem("userToken", JSON.stringify("token de teste"));
		router.push("/edit-profile")
	}

  return (
	<ScrollView style={[globalStyles.bgColor]}>
	  <View style={[globalStyles.hCenter, styles.pageWrapper]}>
			<View style={globalStyles.avatarWrap}>
				<Image
					style={globalStyles.profilePicture}
					source={require("@/assets/mordecai.png")}
				/>
				<Pressable
					style={({ pressed }) => [
						globalStyles.editAvatarBtn,
						pressed && globalStyles.editAvatarBtnPressed,
					]}
					onPress={() => router.push("/edit-profile")}
					accessibilityRole="button"
					accessibilityLabel="Editar foto do perfil"
				>
					<Ionicons name="create-outline" size={22} color="#000000" />
				</Pressable>
			</View>
			<Text>{username ? username : 'NAME PLACEHOLDER'}</Text>

			<View style={styles.profileOptions}>

				<ClickableCard style={styles.btnGap} onPress={addToken}>
					<Ionicons name="person-outline" size={22} color="#000000" />
					<Text>Editar Perfil</Text>
				</ClickableCard>

				<Link href="/wip" asChild style={styles.btnGap}>
					<ClickableCard style={styles.btnGap} onPress={checkToken}>
						<Ionicons name="document-text-outline" size={22} color="#000000" />
						<Text>Meus Relatos</Text>
					</ClickableCard>
				</Link>

				<Link href="/wip" asChild style={styles.btnGap}>
					<ClickableCard style={styles.btnGap}>
						<Ionicons name="map-outline" size={22} color="#000000" />
						<Text>Gerenciar Áreas Monitoradas</Text>
					</ClickableCard>
				</Link>

				<Link href="/wip" asChild style={styles.btnGap}>
					<ClickableCard style={styles.btnGap}>
						<Ionicons name="settings-outline" size={22} color="#000000" />
						<Text>Configurações do App</Text>
					</ClickableCard>
				</Link> 

				<Link href="/wip" asChild style={styles.btnGap}>
					<ClickableCard style={styles.btnGap} onPress={donwloadReport}>
						<Ionicons name="podium-outline" size={22} color="#000000" />
						<Text>Gerar Relatório</Text>
					</ClickableCard>
				</Link>

				<ClickableCard style={styles.btnGap} onPress={logOut}>
					<Ionicons name="exit-outline" size={22} color="#000000" />
					<Text>Sair</Text>
				</ClickableCard>

			</View>
	  </View>
	</ScrollView>
  );
}

async function checkToken() {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
	console.log("Token: null");
	return;
  }
  console.log("Token:", JSON.parse(token));
}



function donwloadReport() {
  console.log("Downloading report...");
}


const styles = StyleSheet.create({
  pageWrapper: {
		paddingTop: "15%",
  },
  btnGap: {
		marginTop: 6,
		marginBottom: 6,
		height: 60,
  },
	profileOptions:{
		width: '80%',
		marginTop: 15,
	}
});

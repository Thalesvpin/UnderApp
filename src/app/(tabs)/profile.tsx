import { Button } from "@/components/button";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
		<View style={styles.avatarWrap}>
		  <Image
		    style={styles.profilePicture}
		    source={require("@/assets/mordecai.png")}
		  />
		  <Pressable
		    style={({ pressed }) => [
		      styles.editAvatarBtn,
		      pressed && styles.editAvatarBtnPressed,
		    ]}
		    onPress={() => router.push("/edit-profile")}
		    accessibilityRole="button"
		    accessibilityLabel="Editar foto do perfil"
		  >
		    <Ionicons name="create-outline" size={22} color="#000000" />
		  </Pressable>
		</View>
		<Text>NAME PLACEHOLDER{username}</Text>

		<View>
			{/* <Link href="/(tabs)/profile/edit-profile" asChild style={styles.btnGap}> */}
				<Button label="Editar Perfil" onPress={addToken} style={styles.btnGap} />
			{/* </Link> */}
			<Link href="/wip" asChild style={styles.btnGap}>
				<Button label="Meus Relatos" onPress={checkToken} />
			</Link>
			<Link href="/wip" asChild style={styles.btnGap}>
				<Button label="Gerenciar Áreas Monitoradas" />
			</Link>
			<Link href="/wip" asChild style={styles.btnGap}>
				<Button label="Configurações do App" />
			</Link>
			<Link href="/wip" asChild style={styles.btnGap}>
				<Button label="Gerar Relatório" onPress={donwloadReport} />
			</Link>
			<Button label="Sair" style={styles.btnGap} onPress={logOut} />

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

const AVATAR_SIZE = 150;

const styles = StyleSheet.create({
  avatarWrap: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		position: "relative",
		alignSelf: "center",
  },
  profilePicture: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
  },
  editAvatarBtn: {
		position: "absolute",
		right: 0,
		bottom: 0,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
		borderColor: "#fff",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		
  },
  editAvatarBtnPressed: {
		opacity: 0.85,
  },
  pageWrapper: {
		paddingTop: "15%",
  },
  btnGap: {
		marginTop: 5,
		marginBottom: 5,
  },
});

import { Button } from "@/components/button";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const authContext = useContext(AuthContext);

  function logOut() {
	console.log("Loging out...");
	authContext.logOut();
	AsyncStorage.removeItem("userToken");
  }

  return (
	<ScrollView style={[globalStyles.bgColor]}>
	  <View style={[globalStyles.hCenter, styles.pageWrapper]}>
		<Image
		  style={styles.profilePicture}
		  source={require("@/assets/mordecai.png")}
		></Image>
		<Text>Nome: Thales</Text>

		<View>
			<Link href="/wip" asChild style={styles.btnGap}>
				<Button label="Editar Perfil" onPress={addToken} />
			</Link>
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

function addToken() {
  console.log("Adding token...");
  AsyncStorage.setItem("userToken", JSON.stringify("token de teste"));
}

function donwloadReport() {
  console.log("Downloading report...");
}

const styles = StyleSheet.create({
  profilePicture: {
	width: 150,
	height: 150,
	borderRadius: 100,
	shadowColor: "#000",
	shadowOffset: { width: 0, height: 2 },
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5,
  },
  pageWrapper: {
	// marginTop: "10%",
	paddingTop: "15%",
  },
  btnGap: {
	marginTop: 5,
	marginBottom: 5,
  },
});

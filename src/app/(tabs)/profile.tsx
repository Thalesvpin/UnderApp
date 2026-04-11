import { ProfilePageOptButton } from "@/components/molecules/profile-page-opt-button";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View
} from "react-native";

export default function Profile() {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");

  async function getUsername() {
    let username = await AsyncStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }

  function logOut() {
    console.log("Loging out...");
    authContext.logOut();
  }

  return (
    <ScrollView style={[globalStyles.bgColor]}>
      <View style={[globalStyles.hCenter, styles.pageWrapper]}>
        <View style={globalStyles.avatarWrap}>
          <Image
            style={globalStyles.profilePicture}
            source={require("@/assets/mordecai.png")}
          />
          {/* <Pressable
					style={({ pressed }) => [
						globalStyles.editAvatarBtn,
						pressed && globalStyles.editAvatarBtnPressed,
					]}
					onPress={() => router.push("/edit-profile")}
					accessibilityRole="button"
					accessibilityLabel="Editar foto do perfil"
				>
					<Ionicons name="create-outline" size={22} color="#000000" />
				</Pressable> */}
        </View>
        <Text>{username ? username : "NAME PLACEHOLDER"}</Text>

        <View style={styles.profileOptions}>
          <ProfilePageOptButton
            icon="person-outline"
            text="Editar Perfil"
            onPress={() => router.push("/edit-profile")}
          />

          <ProfilePageOptButton
            icon="document-text-outline"
            text="Meus Relatos"
            onPress={() => router.push("/wip")}
          />

          <ProfilePageOptButton
            icon="map-outline"
            text="Gerenciar Áreas Monitoradas"
            onPress={() => router.push("/wip")}
          />

          <ProfilePageOptButton
            icon="settings-outline"
            text="Configurações do App"
            onPress={() => router.push("/wip")}
          />

          <ProfilePageOptButton
            icon="podium-outline"
            text="Gerar Relatório"
            onPress={() => router.push("/wip")}
          />

          <ProfilePageOptButton
            icon="exit-outline"
            text="Sair"
            onPress={logOut}
          />
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
  profileOptions: {
    width: "80%",
    marginTop: 15,
  },
});

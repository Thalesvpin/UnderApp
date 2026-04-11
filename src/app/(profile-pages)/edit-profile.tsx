import { EditProfileForm } from "@/components/organisms/edit-profile-form";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

export default function EditProfile() {
	const [userInfo, setUserInfo] = useState({name: '', email: '', cpf: '', cep: '', profileImageUrl: ''});
	
	async function getUserInfo() {
		console.log("Getting user info...");

		UserService.getUserInfo().then(async (response) => {
			if (response.ok) {
				const {data} = await response.json();
				setUserInfo(data);
			}
		}).catch((error) => {
			console.error(error);
		});
	}

  async function saveUserInfo(newUserInfo: {
    firstName: string;
    email: string;
    cpf: string;
    cep: string;
  }) {
    console.log("Saving user info...");
    await AsyncStorage.setItem("username", newUserInfo.firstName);
    await AsyncStorage.setItem("email", newUserInfo.email);
  }

  useEffect(() => {
    getUserInfo();
    console.log("aaa");
  }, []);

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, globalStyles.bgColor]}
      behavior={Platform.select({ ios: "padding", android: "padding" })}
    >
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={[globalStyles.avatarWrap, styles.avatarWrap]}>
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

          <EditProfileForm userInfo={userInfo} onSubmit={saveUserInfo} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrap: {
    marginTop: 15,
  },
});

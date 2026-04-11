import { EditProfileForm } from "@/components/organisms/edit-profile-form";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import UserService from "@/services/user.service";
import { UpdateUserInfo, UserInfo } from "@/utils/types";

const emptyUserInfo: UserInfo = {
	firstName: '',
	lastName: '',
	email: '',
	cep: '',
	profileImageUrl: '',
};

export default function EditProfile() {
	const [userInfo, setUserInfo] = useState<UserInfo>(emptyUserInfo);
	
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

  async function saveUserInfo(newUserInfo: UpdateUserInfo) {
    console.log("Saving user info...");
    UserService.updateUserInfo(newUserInfo).then(async (response) => {
      if (response.ok) {
        const {data} = await response.json();
        setUserInfo(data);
      }
    }).catch((error) => {
      console.error(error);
    });
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

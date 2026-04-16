import { EditProfileForm } from "@/components/organisms/edit-profile-form";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import UserService from "@/services/user.service";
import { UpdateUserInfo, UserInfo } from "@/utils/types";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import Dropdown from "@/components/organisms/dropdown/dropdown";

const MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024;
const emptyUserInfo: UserInfo = {
	firstName: '',
	lastName: '',
	email: '',
	cep: '',
	profileImageUrl: '',
};

export default function EditProfile() {
	const [userInfo, setUserInfo] = useState<UserInfo>(emptyUserInfo);
	const [profilePicture, setProfilePicture] = useState('');
	
	async function getUserInfo() {
		console.log("Getting user info...");

		try{
			const data = await UserService.getUserInfo();
			setUserInfo(data);
				reloadProfilePicture(data.profileImageUrl);
		}
		catch (error) {
			console.error(error);
			Toast.show({
				type: "error",
				text1: "Erro ao carregar informações do usuário",
				text2: "Por favor, tente novamente mais tarde",
			});
		}
	}

	function reloadProfilePicture(imageUrl: string) {
		const bust = Date.now();
		const uriWithBust = imageUrl
			? `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}v=${bust}`
			: '';
		
		setProfilePicture(uriWithBust);
	}

	function guessMimeType(uri: string): string {
		const lower = uri.toLowerCase();
		if (lower.endsWith('.png')) return 'image/png';
		if (lower.endsWith('.webp')) return 'image/webp';
		if (lower.endsWith('.heic') || lower.endsWith('.heif')) return 'image/heic';
		return 'image/jpeg';
	}

	const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Toast.show({
        type: "error",
        text1: "Permissão negada",
        text2: "Por favor, permita acesso à galeria de fotos para atualizar a imagem do perfil",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) return;

		const asset = result.assets[0];
		const mimeType = asset.mimeType ?? guessMimeType(asset.uri);
		const fileName =
			asset.fileName ??
			`profile-${Date.now()}.${mimeType === 'image/png' ? 'png' : 'jpg'}`;

		if (asset.fileSize != null && asset.fileSize > MAX_PROFILE_IMAGE_BYTES) {
			Toast.show({
				type: "error",
				text1: "Arquivo muito grande",
				text2: "O limite é 5 MB.",
			});
			return null;
		}
		return { uri: asset.uri, mimeType, fileName };
	}

	function parseProfileImageUrlFromResponse(body: unknown): string | null {
		if (typeof body === "string") return body || null;
		if (body && typeof body === "object") {
			const o = body as Record<string, unknown>;
			if (typeof o.data === "string") return o.data;
			if (o.data && typeof o.data === "object") {
				const inner = o.data as Record<string, unknown>;
				if (typeof inner.profileImageUrl === "string") return inner.profileImageUrl;
			}
			if (typeof o.profileImageUrl === "string") return o.profileImageUrl;
		}
		return null;
	}
	const updateProfileImage = async () => {
		try {
			const picked = await pickProfileImage();
			if (!picked) return;
			const formData = new FormData();
			formData.append("image", {
				uri: picked.uri,
				name: picked.fileName,
				type: picked.mimeType,
			} as unknown as Blob);

			Toast.show({
				type: "success",
				text1: "Atualizando foto do perfil",
			});
			const response = await UserService.updateUserProfileImage(formData);
			if (!response.ok) {
				let detail = "Tente novamente mais tarde.";
				try {
					const errJson = await response.json();
					const msg =
						typeof errJson?.message === "string"
							? errJson.message
							: Array.isArray(errJson?.message)
								? errJson.message.join(" ")
								: null;
					if (msg) detail = msg;
				} catch {
					/* corpo não-JSON */
				}
				Toast.show({
					type: "error",
					text1: "Não foi possível atualizar a foto",
					text2: detail,
				});
				return;
			}
			const json = await response.json();
			const imageUrl = parseProfileImageUrlFromResponse(json);
			if (!imageUrl) {
				Toast.show({
					type: "error",
					text1: "Resposta inválida do servidor",
					text2: "Não recebemos a URL da imagem.",
				});
				return;
			}
			setUserInfo((prev) => ({ ...prev, profileImageUrl: imageUrl }));
			reloadProfilePicture(imageUrl);
			Toast.show({
				type: "success",
				text1: "Foto do perfil atualizada",
			});
		} catch (e) {
			console.error(e);
			Toast.show({
				type: "error",
				text1: "Erro ao enviar a imagem",
				text2: "Verifique sua conexão e tente de novo.",
			});
		}
  };

	const deleteProfileImage = async () => {
		try {
			const response = await UserService.deleteUserProfileImage();
			if (!response.ok) {
				Toast.show({
					type: "error",
					text1: "Erro ao deletar imagem do perfil",
				});
				return;
			}
			setUserInfo((prev) => ({ ...prev, profileImageUrl: '' }));
			reloadProfilePicture('');
			Toast.show({
				type: "success",
				text1: "Foto do perfil deletada",
			});
		} catch (e) {}
	}

  async function saveUserInfo(newUserInfo: UpdateUserInfo) {
    console.log("Saving user info...");

		try{
			const data = await UserService.updateUserInfo(newUserInfo);
			setUserInfo(data);
			Toast.show({
				type: "success",
				text1: "Perfil atualizado com sucesso",
			});
		}
		catch (error) {
			console.error(error);
			Toast.show({
				type: "error",
				text1: "Erro ao atualizar perfil",
				text2: "Por favor, tente novamente mais tarde",
			});
		}
  }

  useEffect(() => {
    getUserInfo();
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
              source={profilePicture ? {uri: profilePicture} : require("@/assets/default-avatar.png")}
            />
						<Dropdown >
							<Dropdown.Trigger style={globalStyles.editAvatarBtn}>
								<Ionicons name="create-outline" size={20} color="#000" />
							</Dropdown.Trigger>
						
							<Dropdown.Content style={styles.menu}>
								<Dropdown.Item onPress={updateProfileImage}>
									<Text style={styles.itemText}>Edit</Text>
									<Ionicons name="pencil" size={16} color="#111" />
								</Dropdown.Item>
								
								<Dropdown.Item onPress={deleteProfileImage}>
									<Text style={[styles.itemText, styles.destructive]}>
										Delete
									</Text>
									<Ionicons name="trash-outline" size={16} color="#dc2626" />
								</Dropdown.Item>
							</Dropdown.Content>
						</Dropdown>
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

	// dropdown styles
	container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 20,
    top: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    marginTop: 2,
  },
  body: {
    marginTop: 12,
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 20,
  },
  trigger: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 15,
    color: "#111",
  },
  destructive: {
    color: "#dc2626",
  }
});

import { ProfilePageOptButton } from "@/components/molecules/profile-page-opt-button";
import { colorBlue, colorDarkGray, colorGreen, colorOrange, colorPurple, colorRed, globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import UserService from "@/services/user.service";
import { UserInfo } from "@/utils/types";
import Toast from "react-native-toast-message";
import { colorOffWhite } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
	const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
	const [userInfo, setUserInfo] = useState<UserInfo>();
	const [profilePicture, setProfilePicture] = useState('');

	async function getUserInfo() {
		try{
			const data = await UserService.getUserInfo();
			setUserInfo(data);
			setUsername(data.firstName + ' ' + data.lastName);
			setProfilePicture(data.profileImageUrl);
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
	
	useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );

  function logOut() {
    console.log("Loging out...");
    authContext.logOut();
  }

  return (
		<ImageBackground source={require("@/assets/blue-wallpaper.jpg")}>
			<ScrollView style={[styles.bgImg]}>
				<View style={[globalStyles.hCenter, styles.pageWrapper]}>
					<View style={globalStyles.avatarWrap}>
						<Image
							style={globalStyles.profilePicture}
							source={profilePicture ? {uri: profilePicture} : require("@/assets/default-avatar.png")}
						/>
					</View>
					<Text style={styles.username}>Olá, {username ? username : "USERNAME"}</Text>
	
					<ScrollView style={styles.profileOptionsSection} contentContainerStyle={{alignItems: 'center'}}>
						<View style={styles.profileOptions}>
							<View style={styles.profileOptionsSubsection}>
								<View style={globalStyles.flexRow}>
									<Ionicons name="person-outline" size={15} color={colorBlue} />
									<Text>Conta</Text>
								</View>
								<ProfilePageOptButton
									icon="person-outline"
									text="Editar Perfil"
									iconColor={colorBlue}
									onPress={() => router.push("/edit-profile")}
								/>
								<ProfilePageOptButton
									icon="document-text-outline"
									text="Meus Relatos"
									iconColor={colorGreen}
									onPress={() => router.push("/wip")}
								/>
							</View>
							<View style={styles.profileOptionsSubsection}>
								<View style={globalStyles.flexRow}>
									<Ionicons name="map-outline" size={15} color={colorPurple} />
									<Text>Monitoramento</Text>
								</View>
								<View>
									<ProfilePageOptButton
										icon="map-outline"
										text="Gerenciar Áreas Monitoradas"
										iconColor={colorPurple}
										onPress={() => router.push("/wip")}
									/>
								</View>
							</View>
							<View style={styles.profileOptionsSubsection}>
								<View style={globalStyles.flexRow}>
									<Ionicons name="podium-outline" size={15} color={colorOrange} />
									<Text>Relatórios</Text>
								</View>
								<ProfilePageOptButton
									icon="podium-outline"
									text="Gerar Relatório"
									iconColor={colorOrange}
									onPress={() => router.push("/wip")}
								/>
							</View>
							<View style={styles.profileOptionsSubsection}>
								<View style={globalStyles.flexRow}>
									<Ionicons name="settings-outline" size={15} color={colorDarkGray} />
									<Text>Sistema</Text>
								</View>
								<ProfilePageOptButton
									icon="settings-outline"
									text="Configurações do App"
									iconColor={colorDarkGray}
									onPress={() => router.push("/wip")}
								/>
								<ProfilePageOptButton
									icon="exit-outline"
									text="Sair"
									iconColor={colorRed}
									onPress={logOut}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			</ScrollView>
		</ImageBackground>
  );
}

function donwloadReport() {
  console.log("Downloading report...");
}

const styles = StyleSheet.create({
  pageWrapper: {
    paddingTop: "15%",
  },
  bgImg: {
    backgroundImage: require("@/assets/blue-wallpaper.jpg"),
    backgroundSize: "cover",
    backgroundPosition: "center",
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
	profileOptionsSection: {
		width: "100%",
		height: "100%",
		display: 'flex',
		flexDirection: 'column',
		// alignItems: 'center',
		borderRadius: 20,
		backgroundColor: colorOffWhite,
		paddingBottom: 100,
	},
	username: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 10,
	},
	profileOptionsSubsection: {
		gap: 6,
		marginBottom: 15,
	},
});

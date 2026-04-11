import { Button } from "@/components/button";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ClickableCard } from "@/components/clickable-card";
import UserService, { UserInfo } from "@/services/user.service";

export default function Profile() {
	const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
	const [userInfo, setUserInfo] = useState<UserInfo>({});
	const [profilePicture, setProfilePicture] = useState('');

	async function getUserInfo() {
		UserService.getUserInfo().then(async (response) => {
			if (response.ok) {
				const {data} = await response.json();
				setUserInfo(data);
				setUsername(data.firstName + ' ' + data.lastName);
				setProfilePicture(data.profileImageUrl);
			}
		}).catch((error) => {
			console.error(error);
		});
	}
	
	useEffect(() => {
		getUserInfo();
	}, []);

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
					source={profilePicture ? {uri: profilePicture} : require("@/assets/default-avatar.png")}
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

				<ClickableCard style={styles.btnGap}>
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

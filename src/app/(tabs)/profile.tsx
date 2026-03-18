import { globalStyles } from "@/stylesheets/global-stylesheet";
import { StyleSheet, ScrollView, Text, Image, View } from "react-native";
import { Button } from "@/components/button";
import { Link } from "expo-router";

export default function Profile(){
	return(
		<ScrollView style={[globalStyles.bgColor]}>
			<View style={[globalStyles.hCenter, styles.pageWrapper]}>
				<Image style={styles.profilePicture} source={require("@/assets/mordecai.png")}></Image>
				<Text>Nome: Thales</Text>
				
				<View>
					<Link href="/wip" asChild style={styles.btnGap}>
						<Button label="Editar Perfil" />
					</Link>
					<Link href="/wip" asChild style={styles.btnGap}>
						<Button label="Meus Relatos" />
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
					<Link href="/" dismissTo asChild style={styles.btnGap}>
						<Button label="Sair" onPress={logOut} />
					</Link>
				</View>
			</View>
		</ScrollView>
	)
}

function donwloadReport(){
	console.log('Downloading report...')
}

function logOut(){
	console.log('Loging out...')
	
}

const styles = StyleSheet.create({
	profilePicture: {
		width: 150,
		height: 150,
		borderRadius: 100,
		shadowColor: '#000',
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
	}

})
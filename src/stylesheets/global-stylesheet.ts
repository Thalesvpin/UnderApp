import { StyleSheet } from "react-native";

const AVATAR_SIZE = 150;

export const globalStyles = StyleSheet.create({
	bgColor:{
		backgroundColor: '#d2e8ff',
	},
	title:{
		fontSize: 24,
		fontWeight: 'bold',
	},
	logo:{
		height: 100,
		resizeMode: 'contain',
	},
	loginSignupContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginFields:{
		width: '93%',
	},
	border: {
		borderWidth: 1,
		borderColor: '#000',
	},
	hCenter: {
		width: '100%',
		alignItems: 'center',
	},
	inputIcon:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		marginBottom: 5,
	},
	avatarWrap: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		position: "relative",
		alignSelf: "center",
		marginBottom: 15,
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
	cardBg: {
		backgroundColor: '#fff',
		borderRadius: 20,
		display: 'flex',
		alignItems: 'center',
		width: "80%",
		padding: 20,
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	}
})
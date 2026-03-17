import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
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
		width: '70%',
	},
	border: {
		borderWidth: 1,
		borderColor: '#000',
	},
	hCenter: {
		width: '100%',
		// justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ff0000',
	}
})
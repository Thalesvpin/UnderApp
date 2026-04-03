import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
	label: string
}

export function Button({label, style, ...rest}: ButtonProps){
	return(
		<TouchableOpacity style={[styles.button, style]} activeOpacity={0.7} {...rest}>
			<Text style={styles.buttonText}> {label} </Text>
		</TouchableOpacity>

	)
}

const styles = StyleSheet.create({
	button:{
		backgroundColor: '#007bff',
		borderRadius: 20,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText:{
		color: '#fff',
		fontWeight: 'bold',
	}
})
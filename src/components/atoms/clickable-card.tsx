import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

export function ClickableCard({children, style, ...rest}: TouchableOpacityProps) {
	return (
		<TouchableOpacity style={[styles.card, style]} {...rest}>
			{children}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
		paddingLeft: 15,
		shadowColor: '#000',
		shadowOffset: { width: 5, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	}
})
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export function PasswordInput({ secureTextEntry = true, ...rest }){
	const [hidePassword, setHidePassword] = useState(secureTextEntry);

	return (
		<View style={styles.wrapper}>
			<TextInput secureTextEntry={hidePassword} {...rest} />
			{secureTextEntry && (
				<TouchableOpacity 
					style={styles.icon}
					onPress={() => setHidePassword(!hidePassword)}
				>
					<Ionicons
						name={hidePassword ? "lock-closed" : "lock-open"}
						size={20}
						color="gray"
					/>
				</TouchableOpacity>
			)}
		</View>

	)
}

const styles = {
	wrapper: {
		borderWidth: 1,
		// borderColor: '#ff000053',
		borderColor: '#0011ff53',
		borderRadius: 10,
		paddingLeft: 10,
		marginBottom: 15,
		
	},
	icon: {
		position: "absolute" as const,
		right: 10,
		top: "50%" as const,
		transform: [{ translateY: -10 }],
	},
}
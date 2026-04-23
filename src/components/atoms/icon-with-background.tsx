import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type IconWithBackgroundProps = {
	icon: keyof typeof Ionicons.glyphMap;
	iconColor: string;
	iconSize?: number;
}

export function IconWithBackground({ icon, iconColor, iconSize = 22 }: IconWithBackgroundProps) {
	const wrapSize = iconSize + 10;
	
	return (
		<View style={[
			styles.iconWrap,
			{
				width: wrapSize,
				height: wrapSize,
				backgroundColor: `${iconColor}20`
			}
		]}>
			<Ionicons name={icon} size={iconSize} color={iconColor} />
		</View>
	)
}

const styles = StyleSheet.create({
	iconWrap: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
})
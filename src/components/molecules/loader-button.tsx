import { View, StyleSheet, Text, ColorValue } from "react-native";
import { Button } from "../atoms/reactix/button/button";
import { CircularLoader } from "../atoms/reactix/circular-loader/circular-loader";
import { Ionicons } from "@expo/vector-icons";

type LoaderButtonProps = {
	loadingText: string;
	isLoading: boolean;
	onPress: () => void;
	label: string;
	disabled: boolean;
	icon?: keyof typeof Ionicons.glyphMap;
	color?: ColorValue;
}

export function LoaderButton({ disabled, loadingText, isLoading, onPress, label, icon, color = '#007bff' }: LoaderButtonProps) {
	return (
		<Button
			style={styles.border}
			loadingText={loadingText}
			isLoading={isLoading}
			disabled={disabled}
			onPress={onPress}
			loadingTextColor="#000"
			showLoadingIndicator
			renderLoadingIndicator={() => (
				<View style={{ marginRight: 8 }}>
					<CircularLoader
						size={18}
						strokeWidth={2.5}
						enableBlur
						gradientLength={50}
						duration={500}
					/>
				</View>
			)}
		>
			<View style={[styles.btn, { backgroundColor: color }]}>
				{icon && <Ionicons name={icon} size={20} color="#fff" />}
				<Text style={styles.btnText}>{label}</Text>
			</View>
		</Button>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 110,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
		justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 20,
		width: '100%',
		height: 48,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
	border:{
		borderWidth: 1,
		borderColor: '#00000000',
	}
});
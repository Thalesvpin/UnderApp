import { View, StyleSheet, Text } from "react-native";
import { Button } from "./reactix/button/button";
import { CircularLoader } from "./reactix/circular-loader/circular-loader";

type LoaderButtonProps = {
	loadingText: string;
	isLoading: boolean;
	onPress: () => void;
	label: string;
	disabled: boolean;
}

export function LoaderButton({ disabled, loadingText, isLoading, onPress, label }: LoaderButtonProps) {
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
			<View style={styles.btn}>
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
    flexDirection: "column",
    alignItems: "center",
		justifyContent: 'center',
    gap: 10,
    backgroundColor: "#007bff",
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
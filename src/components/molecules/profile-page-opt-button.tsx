import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { ClickableCard } from "../atoms/clickable-card";
import { colorGray } from "@/stylesheets/global-stylesheet";

type ProfilePageOptButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  iconColor: string;
  onPress: () => void;
};

export function ProfilePageOptButton({
  icon,
  text,
  iconColor,
  onPress,
}: ProfilePageOptButtonProps) {
  return (
    <ClickableCard style={styles.btnConfig} onPress={onPress}>
      <View style={styles.btnContent}>
				<View style={[styles.iconWrap, { backgroundColor: `${iconColor}20` }]}>
					<Ionicons name={icon} size={22} color={iconColor} />
				</View>
				<Text>{text}</Text>
			</View>
			<Ionicons name="chevron-forward-outline" size={22} color={colorGray} />
    </ClickableCard>
  );
}

const styles = StyleSheet.create({
  btnConfig: {
    height: 60,
		justifyContent: 'space-between',
  },
	btnContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
  profileOptions: {
    width: "80%",
    marginTop: 15,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

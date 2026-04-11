import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { ClickableCard } from "../atoms/clickable-card";

type ProfilePageOptButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
};

export function ProfilePageOptButton({
  icon,
  text,
  onPress,
}: ProfilePageOptButtonProps) {
  return (
    <ClickableCard style={styles.btnGap} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#000000" />
      <Text>{text}</Text>
    </ClickableCard>
  );
}

const styles = StyleSheet.create({
  btnGap: {
    marginTop: 6,
    marginBottom: 6,
    height: 60,
  },
  profileOptions: {
    width: "80%",
    marginTop: 15,
  },
});

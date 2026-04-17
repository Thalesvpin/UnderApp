import { ColorValue, StyleSheet, Text, View } from "react-native";
import { BottomSheet } from "./reactix/bottom-sheet/bottom-sheet";
import { BottomSheetMethods } from "./reactix/bottom-sheet/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { MarkerData } from "@/utils/types";

type CustomBottomSheetProps = {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
	marker: MarkerData | null;
}

export function CustomBottomSheet({ sheetRef, marker }: CustomBottomSheetProps) {
	const ListItem = ({
    icon,
    label,
    isLast = false,
  }: {
    icon: string;
    label: string;
    isLast?: boolean;
  }) => (
    <Pressable style={[styles.listItem, isLast && styles.listItemLast]}>
      <Feather name={icon as any} size={18} color="#888" />
      <Text
        style={[styles.listText]}
      >
        {label}
      </Text>
      <Feather name="chevron-right" size={16} color="#444" />
    </Pressable>
  );
	
	const statusIcon = () => {
		if (!marker) return null;
		
		let color: ColorValue;
		let icon: keyof typeof Ionicons.glyphMap;

		switch (marker.severity) {
			case 'low':
				color = 'green';
				icon = 'ellipse';
				break;
			case 'medium':
				color = 'yellow';
				icon = 'ellipse';
				break;
			case 'high':
				color = 'orange';
				icon = 'ellipse';
				break;
			case 'very-high':
				color = 'red';
				icon = 'ellipse';
				break;
			case 'critical':
				color = 'red';
				icon = 'alert-circle';
				break;
			default:
				color = 'gray';
				icon = 'ellipse';
				break;
		}
		return <Ionicons name={icon} size={18} color={color} />;
	}

  return (
    <BottomSheet
			ref={sheetRef}
			snapPoints={["25%", "50%", "90%"]}
			backgroundColor="#1c1c1e"
			backdropOpacity={0.6}
			borderRadius={28}
		>
			<View style={styles.sheet}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.w70}>
						<Text style={styles.headerText}>
							{marker?.title ? marker.title : ('Resumo de Ocorriência')}
						</Text>
						<View style={styles.status}>
							{statusIcon()}
							<Text style={styles.statusText}>{marker?.severity ? marker.severity : 'Severidade'}</Text>
						</View>
					</View>
					<View>
						<Pressable onPress={() => {console.log('share')}}>
							<Ionicons name="share-social-outline" size={24} color="white" />
						</Pressable>
					</View>
				</View>
				
				<View style={styles.hLine}></View>

				{/* Action Row */}
				<View>
					<Text style={styles.date}>
						Atualizado em: --:--  --/--/----
					</Text>

					<Text style={styles.sectionTitle}>Local</Text>
					<View style={styles.infoBox}>
						<Text style={styles.descriptionText}>Nome da rua?</Text>
					</View>

					<Text style={styles.sectionTitle}>Descrição</Text>
					<View style={styles.infoBox}>
						<Text style={styles.descriptionText}>
							{marker?.description ? marker.description : 'Descrição da ocorrência'}
						</Text>
					</View>
				</View>
				
				{/* Temprorario */}
				<View style={{height: 400}}></View>
				
				{/* Privacy Section */}
				<Text
					style={[
						styles.sectionTitle,
					]}
				>
					Privacy
				</Text>
				<View style={styles.list}>
					<ListItem icon="lock" label="Security" />
					<ListItem icon="shield" label="Data" isLast />
				</View>
			</View>
		</BottomSheet>
  );
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  trigger: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
	headerText: {
		fontSize: 20,
		color: '#fff',
		marginBottom: 4,
	},
  row: {
    flexDirection: "row",
    backgroundColor: "#2c2c2e",
    borderRadius: 14,
    marginBottom: 24,
  },
  rowItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  rowDivider: {
    width: 1,
    backgroundColor: "#3a3a3c",
  },
  rowText: {
    fontSize: 15,
    color: "#0a84ff",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 13,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  list: {
    backgroundColor: "#2c2c2e",
    borderRadius: 14,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
    marginLeft: 12,
  },
	hLine: {
		height: StyleSheet.hairlineWidth,
    backgroundColor: "#5c5c61",
    alignSelf: "stretch",
		marginVertical: 16,
		marginHorizontal: -20,
	},
	date: {
		fontSize: 13,
		color: "#fff",
		marginBottom: 8,
		marginLeft: 4,
		alignSelf: 'flex-end',
	},
	infoBox: {
		backgroundColor: "#2c2c2e",
		borderRadius: 14,
		padding: 14,
		marginBottom: 20,
	},
	descriptionText: {
		fontSize: 15,
		color: "#fff",
	},
	w70: {
		width: '70%',
	},
	status: {
		flexDirection: 'row',
		gap: 4,
	},
	statusText: {
		fontSize: 13,
		color: '#fff',
	},
});
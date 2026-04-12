import { CustomBottomSheet } from "@/components/organisms/custom-bottom-sheet";
import BottomSheet from "@/components/organisms/reactix/bottom-sheet/bottom-sheet";
import { BottomSheetMethods } from "@/components/organisms/reactix/bottom-sheet/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import { ColorValue, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { default as Map, default as MapView, Marker, UrlTile } from "react-native-maps";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const defaultCoords = {
	latitude: -22.511593970585,
	longitude: -43.17846632428288,
}

export default function Index() {
	type MarkerData = {
		id: number;
		icon: keyof typeof Ionicons.glyphMap;
		color: ColorValue,
		latitude: number;
		longitude: number;
	};

  const [coordinates, setCoordinates] = useState<Location.LocationObjectCoords | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([
		{ id: 1, icon: 'location', color: 'red', latitude: -22.511611632520278, longitude: -43.17846446198439 },
		{ id: 2, icon: 'location', color: 'blue', latitude: -22.5094878268097, longitude: -43.182550472633665 },
  ]);
  const mapRef = useRef<MapView | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const stopTracking = useCallback(() => {
    watchRef.current?.remove();
    watchRef.current = null;
  }, []);

  const startTracking = useCallback(async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status !== "granted") return;

    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) return;

    stopTracking();

    try {
      const snap = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCoordinates(snap.coords);
    } catch {
      /* GPS pode acabar de ser ligado; o watch abaixo preenche em seguida */
    }

    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1,
      },
      (location) => {
        setCoordinates(location.coords);
      },
    );
  }, [stopTracking]);

  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, [startTracking, stopTracking]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const enabled = await Location.hasServicesEnabledAsync();

      if (enabled && !coordinates) {
        startTracking();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [coordinates, startTracking]);

  const handleCenter = () => {
    if (!coordinates) {
      console.log("sem coords");
      return;
    }

    mapRef.current?.animateToRegion(
      {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000,
    );
  };

	const sheetRef = useRef<BottomSheetMethods>(null);

	const renderContent = () => {
		sheetRef.current?.snapToIndex(0)
	}

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Map
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={
					coordinates ? {
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					} : {
						latitude: defaultCoords.latitude,
						longitude: defaultCoords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}
				}
        showsUserLocation={false}
			>
				<UrlTile
					urlTemplate={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`}
					maximumZ={19}
					flipY={false}
				/>
				{coordinates ? (
					<Marker
						coordinate={{
							latitude: coordinates.latitude,
							longitude: coordinates.longitude,
						}}
						anchor={{ x: 0.5, y: 0.5 }}
					>
						<View style={styles.userDot} />
					</Marker>
				) : null}
				{markers.map(marker => (
					<Marker
						key={marker.id}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						onPress={renderContent}
					>
						<Ionicons name={marker.icon} size={30} color={marker.color} />
					</Marker>
				))}
			</Map>
      <TouchableOpacity style={styles.button} onPress={handleCenter}>
        <Ionicons name="locate" size={28} color="#000" />
      </TouchableOpacity>

			<CustomBottomSheet sheetRef={sheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  userDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4285F4",
    borderWidth: 3,
    borderColor: "#fff",
  },
  button: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ColorValue, StyleSheet, TouchableOpacity, View } from "react-native";
import { default as Map, default as MapView, Marker } from "react-native-maps";

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

  const startTracking = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status !== "granted") return;

    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) return;

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1,
      },
      (location) => {
        setCoordinates(location.coords);
      },
    );
  };

  useEffect(() => {
    startTracking();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const enabled = await Location.hasServicesEnabledAsync();

      if (enabled && !coordinates) {
        startTracking();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [coordinates]);

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
        showsUserLocation={true}
			>
				{markers.map(marker => (
					<Marker
						key={marker.id}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
					>
						<Ionicons name={marker.icon} size={30} color={marker.color} />
					</Marker>
				))}
			</Map>
      <TouchableOpacity style={styles.button} onPress={handleCenter}>
        <Ionicons name="locate" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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

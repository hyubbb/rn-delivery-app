import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import usePlaceStore from "@/store/placeStore";

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "");

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface GooglePlacesInputProps {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const GooglePlacesInput = ({
  location,
  setLocation,
}: GooglePlacesInputProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search or move the map'
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when
        const point = details?.geometry?.location;
        if (!point) return;
        setLocation({
          ...location,
          latitude: point.lat,
          longitude: point.lng,
        });
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        language: "en",
      }}
      renderLeftButton={() => (
        <View style={styles.boxIcon}>
          <Text>
            <Ionicons
              name='search-outline'
              size={24}
              color={Colors.medium}
              style={{ backgroundColor: Colors.grey }}
            ></Ionicons>
          </Text>
        </View>
      )}
      styles={{
        container: {
          flex: 0,
        },
        textInputContainer: {
          backgroundColor: "#fff",
          padding: 8,
        },
        textInput: {
          backgroundColor: Colors.grey,
          paddingLeft: 35,
          borderRadius: 10,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
    />
  );
};
const LocationSearch = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState({ latitude: 0, longitude: 0 });
  const { addPlace } = usePlaceStore();
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({
        ...location,
        latitude,
        longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      });
    })();
  }, []);

  useEffect(() => {
    // 역지오코딩 수행
    if (marker.latitude !== 0) {
      Geocoder.from(marker.latitude, marker.longitude)
        .then((json) => {
          const addressComponent = json.results[0].formatted_address;
          setAddress(addressComponent);
        })
        .catch((error) => console.warn(error));
    }
  }, [marker]);

  const handlePlace = () => {
    addPlace(address);
    navigation.goBack();
  };

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event?.nativeEvent?.coordinate;

    // 새 마커 설정
    setMarker({ latitude, longitude });
    setLocation({ ...location, latitude, longitude });

    try {
      const json = await Geocoder.from(latitude, longitude);
      const addressComponent = json.results[0].formatted_address;
      setAddress(addressComponent);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesInput location={location} setLocation={setLocation} />
      <MapView
        // showsUserLocation={true}
        style={styles.map}
        region={location}
        initialRegion={location}
        onPress={handleMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <View style={styles.absoluteBox}>
        <TouchableOpacity onPress={handlePlace}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>위치 설정</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  boxIcon: {
    position: "absolute",
    top: 18,
    left: 15,
    zIndex: 1,
  },
});

export default LocationSearch;

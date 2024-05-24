import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const GooglePlacesInput = ({ location, setLocation }) => {
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
        console.log(details, point);
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
  const initLocation = {
    latitude: 37.551891,
    longitude: 126.991794,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const navigation = useNavigation();
  const [location, setLocation] = useState(initLocation);
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesInput location={location} setLocation={setLocation} />
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        region={location}
      />

      <View style={styles.absoluteBox}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </View>
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

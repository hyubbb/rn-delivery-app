import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{ padding: 16 }}
    >
      <View style={styles.container}>
        {restaurants.map((restaurant, index) => (
          <Link href={"/details"} key={index} asChild>
            <TouchableOpacity>
              <View style={styles.categoryCard}>
                <Image source={restaurant.img} style={styles.image} />
                <View style={styles.categoryBox}>
                  <Text style={styles.categoryText}>{restaurant.name}</Text>
                  <Text style={{ color: Colors.green }}>
                    {restaurant.rating} {restaurant.ratings}
                  </Text>
                  <Text style={{ color: Colors.medium }}>
                    {restaurant.distance}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: "row",
  },
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default Restaurants;

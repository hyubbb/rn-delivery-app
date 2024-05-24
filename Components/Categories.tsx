import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";
import { ScrollView } from "react-native-gesture-handler";
const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{ padding: 16 }}
    >
      <View style={styles.container}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <Image source={category.img} style={styles.img} />
            <Text style={styles.categoryText}>{category.text}</Text>
          </View>
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
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    borderRadius: 4,
  },
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
  },
  img: { borderRadius: 5 },
});

export default Categories;

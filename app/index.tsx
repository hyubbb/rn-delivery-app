import { Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Categories from "@/Components/Categories";
import Restaurants from "@/Components/Restaurants";
import Colors from "@/constants/Colors";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <Categories />
        <Text style={styles.header}>인기 매장</Text>
        <Restaurants />
        <Text style={styles.header}>주변 인기매장</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 120,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

type DishProps = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
};

const Dish = () => {
  const { id, name } = useLocalSearchParams();
  const item = getDishById(+id!, name + "");

  const router = useRouter();
  const { addProduct } = useBasketStore();

  const addToCart = (item: DishProps) => {
    addProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Animated.Image
          source={item?.img}
          style={styles.image}
          entering={FadeIn.duration(500).delay(400)}
        />
        <View style={{ padding: 20 }}>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(400)}
            style={styles.dishName}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(400)}
            style={styles.dishInfo}
          >
            {item?.info}
          </Animated.Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => addToCart(item!)}
          >
            <Text style={styles.footerText}>
              장바구니 담기 {item?.price} 원
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dishInfo: {
    fontSize: 16,
    color: Colors.mediumDark,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 10,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dish;

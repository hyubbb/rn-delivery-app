import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  ListRenderItem,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import ParallaxScrollView from "@/Components/ParallaxScrollView";
// import ParallaxScrollView from "react-native-parallax-scroll-view";

import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useBasketStore from "@/store/basketStore";
import { Link } from "expo-router";

type itemsProps = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
};

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const { items, total } = useBasketStore();

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
        >
          <Ionicons name='arrow-back' size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.roundButton}
          >
            <Ionicons name='share-outline' size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.roundButton}
          >
            <Ionicons name='search-outline' size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 150) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const renderItem: ListRenderItem<itemsProps> = ({ item, index }) => (
    <Link href={{ pathname: "/(modal)/dish", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>{item.price}</Text>
        </View>
        <Image source={item.img} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <ParallaxScrollView
        backgroundColor={"#fff"}
        scrollEvent={onScroll}
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={110}
        renderBackground={() => (
          <Image source={restaurant.img} style={styles.stickyImage} />
        )}
        contentBackgroundColor={Colors.lightGrey}
        renderStickyHeader={() => (
          <View key='sticky-header' style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} ・{" "}
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? " ・ " : ""}`
            )}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
          <SectionList
            contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
            keyExtractor={(item, index) => `${item.id + index}`}
            sections={DATA}
            scrollEnabled={false}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginHorizontal: 10,
                  height: 1,
                  backgroundColor: Colors.lightGrey,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.lightGrey,
                }}
              />
            )}
          />
        </View>
      </ParallaxScrollView>

      {/* Sticky segments */}
      <Animated.View style={[animatedStyles, styles.stickySegments]}>
        <View style={styles.segmentsShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentScrollview}
          >
            {restaurant.food.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref!)}
                key={index}
                style={
                  activeIndex === index
                    ? styles.segmentButtonActive
                    : styles.segmentButton
                }
                onPress={() => selectCategory(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Footer basket */}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView>
            <Link href={"/basket"} asChild>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.basket}>{items}</Text>
                <Text style={styles.footerText}>View Basket</Text>
                <Text style={styles.basketTotal}>Total: ${total}</Text>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#fff",
  },
  stickySection: {
    marginLeft: 70,
    height: 100,
    justifyContent: "flex-end",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
  stickyImage: {
    width: "100%",
    height: 300,
  },
  restaurantName: { fontSize: 30, fontWeight: "bold", margin: 10 },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 10,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  dish: { fontSize: 16, fontWeight: "bold" },
  dishText: { fontSize: 14, color: Colors.medium, paddingVertical: 4 },
  stickySegments: {
    position: "absolute",
    height: 60,
    left: 0,
    top: 100,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingBottom: 4,
  },
  segmentsShadow: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    paddingTop: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  segmentButton: {
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  segmentText: { color: Colors.primary, fontSize: 16 },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  segmentScrollview: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 10,
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

  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  basket: {
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: "#19AA86",
    borderRadius: 8,
    color: "#fff",
    fontWeight: "bold",
  },
  basketTotal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderRadius: 8,
    height: 50,
    backgroundColor: Colors.primary,
  },
});

export default Details;

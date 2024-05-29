import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='arrow-down-outline' size={22} color={Colors.medium} />
        <View style={styles.itemText}>
          <Text>정렬</Text>
        </View>
        <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name='fast-food-outline' size={22} color={Colors.medium} />
        <View style={styles.itemText}>
          <Text>평점</Text>
        </View>
        <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
);
const filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      // 값의 변경을 감지하여 애니메이션을 적용합니다.
      flexWidth.value = newSelected ? 150 : 0;
      scale.value = newSelected ? 1 : 0;
    }
    setSelected(selectedItems);
  }, [items]);

  const handleClearAll = () => {
    // 체크 전체 해제
    const updateItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updateItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(flexWidth.value),
      opacity: withTiming(flexWidth.value > 0 ? 1 : 0),
      display: withTiming(flexWidth.value > 0 ? "flex" : "none"),
    };
  });
  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value) }],
    };
  });

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        style={{ width: 25 }}
        fillColor={Colors.primary}
        unFillColor='#fff'
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
        }}
        onPress={() => {
          const isChecked = items[index].checked;
          const updatedItems = items.map((item, idx) => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }
            return item;
          });
          setItems(updatedItems);
        }}
        isChecked={item.checked}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={{ height: 80 }} />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[animatedStyles, styles.outlineButton]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>
                {/* <Text style={styles.outlineButtonText}>Clear All</Text> */}
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={navigation.goBack}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
    height: 56,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 56,
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default filter;

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/store/basketStore";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";
type itemsProps = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
};

type Product = itemsProps & {
  quantity: number;
};

const Basket = () => {
  const { products, items, total, addProduct, clearCart, reduceProduct } =
    useBasketStore();
  const [order, setOrder] = useState(false);
  const router = useRouter();
  const FEES = {
    service: 3000,
    delivery: 3000,
  };

  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };

  const closeRow = (rowMap: RowMap<Product>, rowKey: number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const renderHiddenItem = (
    data: { item: Product; index: number },
    rowMap: RowMap<Product>
  ) => (
    <View style={{ alignItems: "flex-end" }}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: "100%",
          backgroundColor: Colors.medium,
        }}
        onPress={() => {
          closeRow(rowMap, data.index!);
          reduceProduct(data.item);
          if (items === 1) {
            router.push("/");
          }
        }}
      >
        <Ionicons name='trash-outline' size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {order && (
        <View style={{ flex: 1, alignItems: "center", marginTop: "50%" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            주문해주셔서 감사합니다.
          </Text>
          <Link href='/' asChild>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => setOrder(false)}
            >
              <Text style={styles.footerText}>주문하러 가기</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
      {!order && (
        <>
          <SwipeListView
            keyExtractor={(item, index) => index.toString()}
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Order menu</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
            ListFooterComponent={<View style={{ height: 295 }} />} // Footer 공간 확보
            renderItem={({ item }: { item: Product }) => (
              <View style={styles.row}>
                <Text style={styles.quantity}>{item.quantity}x</Text>
                <Image source={item.img} style={{ width: 50, height: 50 }} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price * item.quantity}</Text>
              </View>
            )}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-60}
          />
          <View style={styles.rowContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.total}>비용</Text>
              <Text style={{ fontSize: 18 }}>{total} 원</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.total}>배송료</Text>
              <Text style={{ fontSize: 18 }}>{FEES.delivery} 원</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.total}>총 결제금액</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {parseInt(FEES.delivery + total)} 원
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <SafeAreaView
              edges={["bottom"]}
              style={{ backgroundColor: "#fff" }}
            >
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckout}
              >
                <Text style={styles.footerText}>주문하기</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
  },
  quantity: { color: Colors.primary, fontSize: 18 },
  name: { flex: 1, fontSize: 18 },
  price: { fontSize: 18 },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
    paddingHorizontal: 10,
  },
  rowContainer: {
    position: "absolute",
    bottom: 110, // footer의 높이 고려
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
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
  fullButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    width: "60%",
    alignItems: "center",
  },
});

export default Basket;

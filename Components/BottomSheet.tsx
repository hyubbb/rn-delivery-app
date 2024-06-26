import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import usePlaceStore from "@/store/placeStore";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const { address } = usePlaceStore();
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );
  const { dismiss } = useBottomSheetModal();
  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        {/* <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInActive}>
            <Text style={styles.inActiveText}>InActive</Text>
          </TouchableOpacity>
        </View> */}

        <Text style={styles.subHeader}>현재 위치</Text>
        <Link href={"/(modal)/location-search"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name='location-outline'
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>
                {address !== "" ? address : "현재 위치 설정"}
              </Text>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </Link>
        <Text style={styles.subHeader}>도착 희망 시간</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name='stopwatch-outline'
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>도착 시간 설정</Text>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  toggleInActive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  inActiveText: {
    color: Colors.primary,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  item: {
    flexDirection: "row",
    padding: 16,
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  itemText: {
    flex: 1,
  },
});

export default BottomSheet;

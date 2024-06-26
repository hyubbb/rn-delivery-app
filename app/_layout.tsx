import { Stack, useNavigation } from "expo-router";
import CustomHeader from "@/Components/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <Stack.Screen
            name='(modal)/filter'
            options={{
              presentation: "modal",
              headerTitle: "Filter",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: Colors.lightGrey },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name='close-outline'
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='(modal)/location-search'
            options={{
              presentation: "fullScreenModal",
              headerTitle: "Select location",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name='close-outline'
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='(modal)/dish'
            options={{
              presentation: "modal",
              headerTitle: "",
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    padding: 6,
                  }}
                >
                  <Ionicons
                    name='close-outline'
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='basket'
            options={{
              headerTitle: "장바구니",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name='arrow-back'
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

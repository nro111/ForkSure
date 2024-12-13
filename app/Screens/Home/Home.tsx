import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet
} from "react-native";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import { IMAGES } from "../../constants/Images";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { Feather } from "@expo/vector-icons";
import ReceiptCard from "../../components/Card/ReceiptCard";
import FirebaseServices from "../../Service/FirebaseServices";
import Utils from "../../utilities/utils";
import LocationTracker from "../../components/Location/LocationTracker";
import Collapsible from "react-native-collapsible";

type HomeScreenProps = { navigation: DrawerNavigationProp<RootStackParamList, "Dashboard"> };

const Home = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const [receiptData, setReceiptData] = useState<any[]>([]);
  const [activeSections, setActiveSections] = useState<string[]>([]);

  useEffect(() => {
    // Subscribe to user receipts
    const unsubscribe = FirebaseServices.subscribeToUserReceipts((data) => {
      console.log("Updated receipts:", data);
      setReceiptData(data);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleSection = (merchantName: string) => {
    setActiveSections((prev) =>
      prev.includes(merchantName)
        ? prev.filter((name) => name !== merchantName)
        : [...prev, merchantName]
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.card, flex: 1, marginBottom: 0 }}
    >
      <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 11,
            backgroundColor: theme.dark ? colors.background : "#FAFCFF",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{
                height: 16,
                width: 22,
              }}
              source={IMAGES.menu}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            activeOpacity={0.5}
            style={{ flex: 1, marginHorizontal: 15 }}
          >
            <TextInput
              style={{
                ...FONTS.fontMedium,
                height: 40,
                borderRadius: 40,
                width: "100%",
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                color: colors.title,
                fontSize: 14,
                paddingHorizontal: 45,
              }}
              placeholder="Search Receipt..."
              placeholderTextColor={"#5F729D"}
              editable={false}
            />
            <View style={{ position: "absolute", left: 15, top: 10 }}>
              <Feather color={COLORS.primary} size={18} name="search" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Allownotification")}
            style={{ padding: 5 }}
          >
            <Image
              style={[GlobalStyleSheet.image3, { tintColor: colors.title }]}
              source={IMAGES.bell}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Location Tracker */}
      <LocationTracker />

      <View
        style={[
          GlobalStyleSheet.container,
          { padding: 0, paddingHorizontal: 15 },
        ]}
      >
        <Text
          style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title, paddingBottom:10 }}
        >
          Your Saved Receipts
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyleSheet.container}>
          {receiptData.length === 0 ? (
            // Default background message when data is empty
            <View style={styles.emptyContainer}>
              <Image source={IMAGES.banneruser} style={styles.emptyImage} resizeMode="contain" />
              <Text style={styles.emptyMessage}>No receipts found</Text>
            </View>
          ) : (
            <View>
            {Object.entries(receiptData).map(([merchantName, transactions]: [string, any[]], index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={() => toggleSection(merchantName)}
                  style={styles.merchantHeaderContainer}
                >
                  <Text style={styles.merchantHeader}>{merchantName}</Text>
                  <Feather
                    name={
                      activeSections.includes(merchantName)
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>

                <Collapsible collapsed={!activeSections.includes(merchantName)}>
                  {transactions.map((data, idx) => (
                    <View key={idx} style={{ marginBottom: 15 }}>
                      <ReceiptCard
                        merchantName={data.merchantName}
                        merchantAddress={data.merchantAddress}
                        transactionDate={Utils.formatFromISODate(
                          data.transactionDate,
                          "MM/dd/yyyy"
                        )}
                        transactionTotal={data.total}
                        onPress={() =>
                          navigation.navigate("WebViewer", {
                            url: data.receiptUri,
                          })
                        }
                      />
                    </View>
                  ))}
                </Collapsible>
              </View>
            ))}
</View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1 
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    fontWeight: "bold",
  },
  merchantHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 5,
  },
  merchantHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Home;

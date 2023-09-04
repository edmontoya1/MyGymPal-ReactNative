import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { User } from "../lib/data";

export default function Post(prop: { users: User | null }) {
  return (
    <View style={styles.container}>
      <Text>{prop.users?.first_name}</Text>
      <Image source={require("../assets/icon.png")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    height: Dimensions.get("window").height - 75,
    borderWidth: 2,
    borderRadius: 15,
  },
  img: {
    height: 50,
    width: 50,
  },
});

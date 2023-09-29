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
import { IPost } from "../types/post.interface";

export default function Post(prop: { post: IPost | null }) {
  return (
    <View style={styles.container}>
      <Text>{prop.post?.username}</Text>
      <Image source={{ uri: prop.post?.image }} />
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

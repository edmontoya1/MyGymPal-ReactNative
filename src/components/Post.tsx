import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { IPost } from "../types/post.interface";

interface PostProp {
  post: IPost | null;
}

export default function Post(prop: PostProp) {
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
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    height: 500,
    borderWidth: 2,
    borderRadius: 15,
  },
  img: {
    height: 50,
    width: 50,
  },
});

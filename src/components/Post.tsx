import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { User } from "../lib/data";

export default function Post(prop: { users: User | null }) {
  return (
    <View style={tw`h-full bg-primaryWhite`}>
      <Text>{prop.users?.username}</Text>
      <Image
        source={require("../assets/icon.png")}
        style={{ width: "auto", height: 350 }}
      />
    </View>
  );
}

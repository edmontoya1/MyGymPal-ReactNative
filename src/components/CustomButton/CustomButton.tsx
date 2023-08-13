import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";

interface ICustomButton {
  onPress: any; // need to change
  text: string;
}

export default function CustomButton({ onPress, text }: ICustomButton) {
  return (
    <Pressable
      onPress={onPress}
      style={tw`w-40 bg-white p-3 my-2 items-center rounded-xl`}
    >
      <Text style={tw`text-black font-bold`}>{text}</Text>
    </Pressable>
  );
}

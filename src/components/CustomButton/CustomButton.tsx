import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";

interface ICustomButton {
  onPress: any; // need to change
  text: string;
}

export default function CustomButton({ onPress, text }: ICustomButton) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});

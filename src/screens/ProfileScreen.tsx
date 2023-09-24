import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { auth } from "../firebase/firebase";

export default function ProfileScreen() {
  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <TouchableOpacity>
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

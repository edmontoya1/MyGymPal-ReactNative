import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { auth } from "../firebase/firebase";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setToken } from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    auth.signOut().then(async () => {
      dispatch(setToken(null));
      await SecureStore.deleteItemAsync("userToken");
      alert("signed out");
    });
  };

  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

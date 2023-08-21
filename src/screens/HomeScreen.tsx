import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStackNavigationProp } from "../types/screens.definition";
import { auth } from "../firebase/firebase";
import tw from "../lib/tailwind";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setToken } from "../redux/slices/userSlice";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(async () => {
        console.log("Sign out");
        await SecureStore.deleteItemAsync("userToken");
        dispatch(setToken(null));
      })
      .catch((error) => alert(error));
  };

  return (
    <SafeAreaView style={tw`bg-background h-full`}>
      <View
        style={tw`w-80 bg-primaryWhite justify-center items-center mx-auto`}
      >
        <TouchableOpacity
          onPress={handleSignOut}
          style={tw`bg-background rounded-md items-center p-3`}
        >
          <Text style={tw`text-white`}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { HomeScreenNavigationProp } from "../types/screens.definition";
import { auth } from "../firebase/firebase";
import tw from "../lib/tailwind";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.replace("WelcomeScreen"))
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

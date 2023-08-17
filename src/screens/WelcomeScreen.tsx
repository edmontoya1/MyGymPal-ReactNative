import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import tw from "../lib/tailwind";
import CustomButton from "../components/CustomButton/CustomButton";
import LottieView from "lottie-react-native";
import { auth } from "../firebase/firebase";
import { SignInScreenNavigationProp } from "../types/screens.definition";

export default function SignInScreen({
  navigation,
}: {
  navigation: SignInScreenNavigationProp;
}) {
  useEffect(() => {
    const unscubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeScreen");
      }
    });
    return unscubscribe;
  }, []);

  const onSignInPressed = () => {
    navigation.navigate("SignInScreen");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={tw`h-full w-full bg-background`}>
      {/* Top Circle */}
      <View
        style={tw`w-[400px] h-[400px] absolute rounded-full bg-secondaryGray/20 -top-10 -left-30`}
      />
      <View style={tw`w-80 h-full items-center m-auto`}>
        <LottieView
          source={require("../assets/Avatar.json")}
          style={tw`h-full w-full absolute`}
          autoPlay
          loop
        />
        <View style={tw`z-10 h-full justify-end bottom-40 gap-5`}>
          <Text
            style={tw`font-extrabold text-center text-base text-white underline tracking-widest`}
          >
            WELCOME
          </Text>
          <CustomButton text={"Sign In"} onPress={onSignInPressed} />
          <CustomButton text={"Sign Up"} onPress={onSignUpPressed} />
          {/* Bottom Circle */}
        </View>
        <View
          style={tw`w-[200px] h-[200px] absolute rounded-full bg-primaryWhite -bottom-10 -right-20`}
        />
      </View>
    </SafeAreaView>
  );
}

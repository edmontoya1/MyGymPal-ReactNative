import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import LottieView from "lottie-react-native";
import { SignInScreenNavigationProp } from "../types/screens.definition";

export default function SignInScreen({
  navigation,
}: {
  navigation: SignInScreenNavigationProp;
}) {
  const onSignInPressed = () => {
    navigation.navigate("SignInScreen");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Circle */}
      <View style={styles.topCircle} />
      <View style={styles.content}>
        <LottieView
          source={require("../assets/Avatar.json")}
          style={styles.lottie}
          autoPlay
          loop
        />
        <View style={styles.buttons}>
          <Text style={styles.text}>WELCOME</Text>
          <CustomButton text={"Sign In"} onPress={onSignInPressed} />
          <CustomButton text={"Sign Up"} onPress={onSignUpPressed} />
        </View>
      </View>
      {/* Bottom Circle */}
      <View style={styles.bottomCircle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#212121",
    alignItems: "center",
  },
  content: {
    width: "80%",
    height: "100%",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  topCircle: {
    width: 400,
    height: 400,
    position: "absolute",
    borderRadius: 200,
    backgroundColor: "#E0E0E0",
    top: -100,
    left: -100,
    opacity: 0.3,
  },
  bottomCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    bottom: -20,
    right: -40,
  },
  buttons: {
    height: "100%",
    justifyContent: "flex-end",
    gap: 5,
    paddingBottom: 200,
    position: "absolute",
  },
  text: {
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    textDecorationLine: "underline",
    letterSpacing: 10,
  },
});

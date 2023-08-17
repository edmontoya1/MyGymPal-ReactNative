import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import tw from "../lib/tailwind";
import CustomButton from "../components/CustomButton/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { SignInScreenNavigationProp } from "../types/screens.definition";

export default function SignInScreen({
  navigation,
}: {
  navigation: SignInScreenNavigationProp;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onGoBackPressed = () => {
    navigation.goBack();
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        console.warn("Signed In");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Wrong Credentials");
      });
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  return (
    <SafeAreaView style={tw`h-full items-center bg-background`}>
      <CustomButton text="Back" onPress={onGoBackPressed} />
      <View style={tw`w-80 h-full justify-center items-center gap-5`}>
        <CustomInput
          placeholder={"Email"}
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
          field="Email"
        />
        <CustomInput
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          field="Password"
        />
        <CustomButton text={"Sign In"} onPress={onSignInPressed} />
        <CustomButton
          text={"Forgot Password?"}
          onPress={onForgotPasswordPressed}
        />
      </View>
    </SafeAreaView>
  );
}

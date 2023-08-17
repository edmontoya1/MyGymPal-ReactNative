import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import tw from "../lib/tailwind";
import CustomButton from "../components/CustomButton/CustomButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { SignUpScreenNavigationProp } from "../types/screens.definition";

export default function SignUpScreen({
  navigation,
}: {
  navigation: SignUpScreenNavigationProp;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onGoBackPressed = () => {
    navigation.goBack();
  };

  const onSignUpPressed = () => {
    console.warn("Sign In");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.warn(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.warn(errorMessage);
      });
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
        <CustomInput
          placeholder={"Confirm Password"}
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          field="Confirm Password"
        />
        <CustomButton text={"Sign Up"} onPress={onSignUpPressed} />
      </View>
    </SafeAreaView>
  );
}

import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { SignUpScreenNavigationProp } from "../types/screens.definition";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setId, setToken } from "../redux/slices/userSlice";

export default function SignUpScreen({
  navigation,
}: {
  navigation: SignUpScreenNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onGoBackPressed = () => {
    navigation.goBack();
  };

  const onSignUpPressed = () => {
    console.warn("Sign In");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const token = await user.getIdTokenResult();
        dispatch(setToken(token.token));
        dispatch(setId(user.uid));
        console.log(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.warn(errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton text="Back" onPress={onGoBackPressed} />

      <View style={styles.content}>
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#212121",
  },
  content: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 5,
  },
});

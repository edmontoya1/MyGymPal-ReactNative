import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUser, auth } from "../firebase/firebase";
import { SignUpScreenNavigationProp } from "../types/screens.definition";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  setUserUID,
  setToken,
  setUser,
  selectUser,
} from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import * as bcrypt from "bcryptjs";

export default function SignUpScreen({
  navigation,
}: {
  navigation: SignUpScreenNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.user);
  const currUser = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUri, setPhotoUri] = useState("");

  const onGoBackPressed = () => {
    navigation.goBack();
  };

  const onSignUpPressed = async () => {
    setIsLoading(true);

    const user = await createUser({
      firstName,
      lastName,
      email,
      photoUri,
      username,
      password,
      userUID: "",
      followers_count: 0,
      following_count: 0,
      pr_squat: 0,
      pr_bench: 0,
      pr_deadlift: 0,
      token: undefined,
    });

    if (user?.token) {
      await SecureStore.setItemAsync("userToken", user.token);
      dispatch(setToken(user.token));
      dispatch(setUser(user.userDoc));
    } else {
      await SecureStore.deleteItemAsync("userToken");
      dispatch(setToken(null));
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.content}>
          <CustomButton text="Back" onPress={onGoBackPressed} />
          <CustomInput
            placeholder={"First Name"}
            value={firstName}
            setValue={setFirstName}
            secureTextEntry={false}
            field="First Name"
          />
          <CustomInput
            placeholder={"Last Name"}
            value={lastName}
            setValue={setLastName}
            secureTextEntry={false}
            field="Last Name"
          />
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
      )}
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
  loading: {
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    flex: 1,
  },
});

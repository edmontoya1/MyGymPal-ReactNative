import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import CustomButton from "../components/CustomButton/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import { auth } from "../firebase/firebase";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setToken, fetchUserById } from "../redux/slices/userSlice";
import { SignInScreenNavigationProp } from "../types/screens.definition";

export default function SignInScreen({ navigation }: { navigation: SignInScreenNavigationProp }) {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onGoBackPressed = () => {
		navigation.goBack();
	};

	const onSignInPressed = async () => {
		// Sign in with firebase auth
		await signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const userAuth = userCredential.user;
				const token = await userAuth.getIdTokenResult();

				await SecureStore.setItemAsync("userToken", token.token);
				dispatch(setToken(token.token));
				dispatch(fetchUserById(userAuth.uid));
			})
			.catch(async (error) => {
				// Sign in failed
				const errorMessage = error.message;
				await SecureStore.deleteItemAsync("userToken");
				alert(errorMessage);
			});
	};

	const onForgotPasswordPressed = () => {
		console.warn("Forgot Password");
	};

	return (
		<SafeAreaView style={styles.container}>
			<CustomButton text="Back" onPress={onGoBackPressed} />
			<View style={styles.content}>
				<CustomInput
					placeholder="Email"
					value={email}
					setValue={setEmail}
					secureTextEntry={false}
					field="Email"
				/>
				<CustomInput
					placeholder="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry
					field="Password"
				/>
				<CustomButton text="Sign In" onPress={onSignInPressed} />
				<CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
		backgroundColor: "#212121"
	},
	content: {
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		gap: 5
	}
});

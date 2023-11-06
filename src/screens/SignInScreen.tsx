import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	ActivityIndicator,
	TextInput,
	Text,
	Dimensions,
	TouchableOpacity
} from "react-native";

import { auth, fetchUserByUID } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectUserStatus, setToken, setUserUID } from "../redux/slices/userSlice";
import { SignUpScreenNavigationProp } from "../types/screens.definition";

export default function SignUpScreen({ navigation }: { navigation: SignUpScreenNavigationProp }) {
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		validateForm();
	}, [password, email]);

	const validateForm = () => {
		const newErrors = [];

		if (!email) {
			newErrors.push("Email is required");
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.push("Email is invalid.");
		}

		if (!password) {
			newErrors.push("Password is required");
		}

		setErrors(newErrors);
		return newErrors.length === 0;
	};

	const onGoBackPressed = () => {
		navigation.goBack();
	};

	const onSubmit = async () => {
		const form = validateForm();
		if (form) {
			await signInWithEmailAndPassword(auth, email as string, password as string)
				.then(async (userCredential) => {
					// Signed In
					const userAuth = userCredential.user;
					const token = await userAuth.getIdToken();

					await SecureStore.setItemAsync("userToken", token);
					dispatch(setToken(token));
					dispatch(setUserUID(userAuth.uid));
					// Get user's doc and set userDocId in local storage
					const userDoc = await fetchUserByUID(userAuth.uid);
					const userDocId = userDoc?.docs[0].id as string;
					await SecureStore.setItemAsync("userDocId", userDocId);
				})
				.catch(async (error) => {
					// Sign in failed
					const errorMessage = error.message;
					await SecureStore.deleteItemAsync("userToken");
					await SecureStore.deleteItemAsync("userDocId");
					console.log("error: ", errorMessage);
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{userStatus === "loading" ? (
				<View style={styles.loading}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<View style={styles.contentContainer}>
					{/* Back Button */}
					<TouchableOpacity onPress={onGoBackPressed}>
						<Ionicons name="arrow-back" size={30} />
					</TouchableOpacity>
					{/* Content */}
					<View style={styles.content}>
						<LottieView
							source={require("../assets/Avatar.json")}
							style={styles.lottie}
							autoPlay
							loop
						/>
						<Text style={styles.title}>Sign In</Text>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="Email"
								value={email}
								onChangeText={setEmail}
								style={styles.input}
							/>
							<TextInput
								placeholder="Password"
								value={password}
								onChangeText={setPassword}
								style={styles.input}
								secureTextEntry
							/>
							<TouchableOpacity onPress={onSubmit} style={styles.button}>
								<Text>Sign In</Text>
							</TouchableOpacity>
							{errors.map((error, index) => (
								<Text key={index} style={styles.error}>
									{error}
								</Text>
							))}
						</View>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF"
	},
	contentContainer: {
		height: "100%",
		width: "80%"
	},
	content: {
		alignItems: "center"
	},
	inputContainer: {
		width: "100%",
		alignItems: "center",
		gap: 15
	},
	input: {
		height: 40,
		width: "80%",
		padding: 10,
		backgroundColor: "#fff",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOpacity: 0.4,
		shadowOffset: {
			width: 0,
			height: 0
		}
	},
	lottie: {
		height: 400
	},
	loading: {
		backgroundColor: "#E0E0E0",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		flex: 1
	},
	error: {
		color: "red",
		fontSize: 12
	},
	button: {
		height: 40,
		width: "80%",
		backgroundColor: "#e2e2e2",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontWeight: "500",
		marginTop: -40,
		marginBottom: 20,
		fontSize: 18,
		color: "gray"
	}
});

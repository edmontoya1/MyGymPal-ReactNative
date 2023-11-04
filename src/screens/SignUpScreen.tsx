import { Ionicons } from "@expo/vector-icons";
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

import { createUserAuth } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectUserStatus } from "../redux/slices/userSlice";
import { ISignUpValidation } from "../types/error.definition";
import { SignUpScreenNavigationProp } from "../types/screens.definition";

export default function SignUpScreen({ navigation }: { navigation: SignUpScreenNavigationProp }) {
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [confimedPassword, setConfimedPassword] = useState<string | undefined>(undefined);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		validateForm();
	}, [password, email, confimedPassword]);

	const validateForm = () => {
		const newErrors = [];

		if (!email) {
			newErrors.push("Email is required");
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.push("Email is invalid.");
		}

		if (!password) {
			newErrors.push("Password is required");
		} else if (password.length < 6) {
			newErrors.push("Password must be at least 6 characters.");
		}

		if (password !== confimedPassword) {
			newErrors.push("Passwords do not match");
		}

		setErrors(newErrors);
		return newErrors.length === 0;
	};

	const onGoBackPressed = () => {
		navigation.goBack();
	};

	const onSubmit = async () => {
		const form = validateForm();
		if (form && email && password) {
			navigation.navigate("EditProfileScreen", {
				email,
				password
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
						<Text style={styles.title}>Create Your Account</Text>
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
							<TextInput
								placeholder="Confirm Passowrd"
								value={confimedPassword}
								onChangeText={setConfimedPassword}
								style={styles.input}
								secureTextEntry
							/>
							<TouchableOpacity onPress={onSubmit} style={styles.button}>
								<Text>Continue</Text>
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

import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

import { createUserAuth, linkUserAuthToNewUserDoc, uploadToFirebase } from "../firebase/firebase";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setToken, setUser, setUserUID } from "../redux/slices/userSlice";
import {
	EditProfileScreenNavigationProp,
	EditProfileScreenRouteProp
} from "../types/screens.definition";
import { pickAndGetImage } from "../utils/camera";

type Props = {
	navigation: EditProfileScreenNavigationProp;
	route: EditProfileScreenRouteProp;
};

const EditProfileScreen = ({ navigation, route }: Props) => {
	const { email, password } = route.params;
	const dispatch = useAppDispatch();
	const [imageUri, setImageUri] = useState<string | undefined>(undefined);
	const [firstName, setFirstName] = useState<string | undefined>(undefined);
	const [lastName, setLastName] = useState<string | undefined>(undefined);
	const [username, setUsername] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const onGoBackPressed = () => {
		navigation.goBack();
	};

	const handleSelectImage = async () => {
		const uri = await pickAndGetImage();
		setImageUri(uri);
	};

	const handleSignUp = async () => {
		setIsLoading(true);

		// Create Auth Account
		const userAuth = await createUserAuth({
			email,
			password
		});

		if (imageUri && userAuth) {
			// Upload to firebase storage and get download url
			const fileName = imageUri.split("/").pop();
			const uploadResp = await uploadToFirebase(
				imageUri,
				fileName,
				userAuth?.user.uid,
				(v: any) => {
					console.log("Uploading picked image: ", v);
				}
			);

			// Link user's auth account to a new user document
			const createdUserDoc = await linkUserAuthToNewUserDoc(userAuth, {
				email,
				password,
				profileImageUri: fileName as string,
				profileImageDownloadUrl: uploadResp?.downloadUrl as string,
				firstName: firstName as string,
				lastName: lastName as string,
				userName: username as string
			});

			if (createdUserDoc) {
				const { userCredential, userDoc, userToCreate } = createdUserDoc;
				const token = await userCredential.user.getIdToken();
				dispatch(setUser(userToCreate));
				dispatch(setUserUID(userCredential.user.uid));
				dispatch(setToken(token));
				await SecureStore.setItemAsync("userToken", token);
				await SecureStore.setItemAsync("userDocId", userDoc.id);
			}
		}

		setIsLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<View style={styles.loading}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<View style={styles.contentContainer}>
					<TouchableOpacity onPress={onGoBackPressed}>
						<Ionicons name="arrow-back" size={30} />
					</TouchableOpacity>

					{/* Content */}
					<View style={styles.content}>
						<TouchableOpacity onPress={handleSelectImage} style={styles.imageContainer}>
							{imageUri ? (
								<Image source={{ uri: imageUri }} style={styles.image} />
							) : (
								<Ionicons name="person" size={70} />
							)}
						</TouchableOpacity>
						<Text style={styles.text}>Select Image</Text>
						{/* Inputs */}
						<TextInput
							placeholder="First Name"
							value={firstName}
							onChangeText={setFirstName}
							style={styles.input}
						/>
						<TextInput
							placeholder="Last Name"
							value={lastName}
							onChangeText={setLastName}
							style={styles.input}
						/>
						<TextInput
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
							style={styles.input}
						/>
						<TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
							<Text>Finish</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default EditProfileScreen;

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		alignItems: "center"
	},
	contentContainer: {
		height: "100%",
		width: "80%"
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		gap: 20
	},
	imageContainer: {
		height: 150,
		width: 150,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightgray"
	},
	image: {
		height: 150,
		width: 150,
		borderRadius: 100
	},
	text: {
		textAlign: "center"
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
	signUpButton: {
		height: 40,
		width: "80%",
		backgroundColor: "#e2e2e2",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	loading: {
		backgroundColor: "#E0E0E0",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		flex: 1
	}
});

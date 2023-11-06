import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet } from "react-native";

import { auth, fetchUserByUID } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setToken, setUser } from "../redux/slices/userSlice";
import { IUser } from "../types/user.definition";

export default function ProfileScreen() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user.user);

	useEffect(() => {
		const fetchUser = async () => {
			// If authenticated, fetch the user
			if (auth.currentUser) {
				const user = await fetchUserByUID(auth.currentUser?.uid);

				if (user) {
					dispatch(setUser(user.docs[0].data() as IUser));
				}
			}
		};
		fetchUser();
	}, []);

	const handleLogOut = () => {
		auth.signOut().then(async () => {
			dispatch(setToken(null));
			await SecureStore.deleteItemAsync("userToken");
			await SecureStore.deleteItemAsync("userDocId");
			alert("signed out");
		});
	};
	console.log(currentUser?.profileImageDownloadUrl);
	return (
		<SafeAreaView>
			<Image source={{ uri: currentUser?.profileImageDownloadUrl }} style={styles.profileImage} />
			<Text>ProfileScreen</Text>
			<TouchableOpacity onPress={handleLogOut}>
				<Text>Log out</Text>
			</TouchableOpacity>
			<ScrollView>
				<Text>{JSON.stringify(auth.currentUser, null, 2)}</Text>
				<Text>---</Text>
				<Text>{JSON.stringify(currentUser, null, 2)}</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		height: 100,
		width: 100
	}
});

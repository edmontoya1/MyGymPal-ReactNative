import * as SecureStore from "expo-secure-store";
import React from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";

import { auth } from "../firebase/firebase";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setToken } from "../redux/slices/userSlice";

export default function ProfileScreen() {
	const dispatch = useAppDispatch();

	const handleLogOut = () => {
		auth.signOut().then(async () => {
			dispatch(setToken(null));
			await SecureStore.deleteItemAsync("userToken");
			await SecureStore.deleteItemAsync("userDocId");
			alert("signed out");
		});
	};

	return (
		<SafeAreaView>
			<Text>ProfileScreen</Text>
			<TouchableOpacity onPress={handleLogOut}>
				<Text>Log out</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

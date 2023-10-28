import React, { useEffect, useState } from "react";
import { SafeAreaView, Dimensions, StyleSheet, View, ActivityIndicator } from "react-native";

import MiniProfile from "../components/MiniProfile";
import MyFilesList from "../components/MyPostsList";
import { fakePostData } from "../lib/data";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
	fetchAllPosts,
	getPostsStatus,
	selectCurrentPost,
	selectPosts
} from "../redux/slices/postSlice";
import {
	fetchAllUsers,
	getLoadedUsersStatus,
	getUsersMap,
	selectLoadedUsers,
	setUsersMap
} from "../redux/slices/usersSlice";
import { HomeStackNavigationProp } from "../types/screens.definition";
import { IUser } from "../types/user.definition";

export default function HomeScreen({ navigation }: { navigation: HomeStackNavigationProp }) {
	const dispatch = useAppDispatch();
	const loadedUsers = useAppSelector(selectLoadedUsers);
	const loadedUsersStatus = useAppSelector(getLoadedUsersStatus);
	const posts = useAppSelector(selectPosts);
	const postsStatus = useAppSelector(getPostsStatus);
	const currentPost = useAppSelector(selectCurrentPost);
	const usersMap = useAppSelector(getUsersMap);
	const [isMapSet, setIsMapSet] = useState<boolean>(false);

	useEffect(() => {
		if (loadedUsersStatus === "idle") {
			dispatch(fetchAllUsers());
		}

		// Could be refactored
		if (loadedUsersStatus === "succeeded" && loadedUsers && isMapSet === false) {
			const newUserMap: { [key: string]: IUser } = {};
			console.log("mixing");
			loadedUsers.forEach((user) => {
				newUserMap[user.username] = user;
			});

			dispatch(setUsersMap(newUserMap));
			setIsMapSet(true);
		}

		if (postsStatus === "idle") {
			dispatch(fetchAllPosts());
		}
	}, [postsStatus, loadedUsersStatus, dispatch, currentPost]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.miniProfileContainer}>
				{/* {loadedUsersStatus === "loading" || currentPost == null ? (
					<View style={styles.loading}>
						<ActivityIndicator size="large" />
					</View>
				) : (
					<MiniProfile user={usersMap[currentPost?.username]} />
				)} */}
				<MiniProfile user={usersMap[currentPost?.username as string]} />
			</View>
			<View style={styles.flatListContainer}>
				{/* {postsStatus === "loading" ? (
					<View style={styles.loading}>
						<ActivityIndicator size="large" />
					</View>
				) : (
					<MyFilesList posts={posts} />
				)} */}
				<MyFilesList posts={fakePostData} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		height: Dimensions.get("window").height,
		alignItems: "center",
		gap: 10
	},
	miniProfileContainer: {
		width: Dimensions.get("window").width * 0.9,
		flex: 1
	},
	flatListContainer: {
		width: Dimensions.get("window").width * 0.9,
		borderRadius: 15,
		flex: 3
	},
	loading: {
		backgroundColor: "#e2e2e2",
		justifyContent: "center",
		flex: 1
	}
});

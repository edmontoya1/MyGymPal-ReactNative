import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Button,
	ActivityIndicator,
	SafeAreaView
} from "react-native";

import DropdownList from "./DropdownList";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
	getPostsStatus,
	selectImageToUpload,
	setImageToUpload,
	uploadPost
} from "../redux/slices/postSlice";
import { PostScreenNavigationProp } from "../types/screens.definition";

const PostForm = ({ navigation }: { navigation: PostScreenNavigationProp }) => {
	const dispatch = useAppDispatch();
	const userUploadImageUri = useAppSelector(selectImageToUpload);
	const postStatus = useAppSelector(getPostsStatus);
	const [comment, setComment] = useState<string>("");

	const handleUploadPost = async () => {
		dispatch(uploadPost({ userUploadImageUri, comment }));
	};

	const handleGoBack = () => {
		dispatch(setImageToUpload(undefined));
		navigation.navigate("AppStackScreen");
	};
	return (
		<SafeAreaView style={styles.container}>
			{postStatus === "loading" ? (
				<View style={styles.loading}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<>
					<Button title="<" onPress={handleGoBack} />
					<Image source={{ uri: userUploadImageUri }} style={{ width: 200, height: 200 }} />
					<TextInput style={styles.input} value={comment} onChangeText={setComment} />
					<DropdownList />
					<Button title="Upload Post" onPress={handleUploadPost} />
				</>
			)}
		</SafeAreaView>
	);
};

export default PostForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10
	},
	loading: {
		backgroundColor: "#E0E0E0",
		justifyContent: "center",
		alignItems: "center",
		flex: 1
	}
});

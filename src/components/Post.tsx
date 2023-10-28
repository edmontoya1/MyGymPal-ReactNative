import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

import { IPost } from "../types/post.definition";

interface PostProp {
	post: IPost | null;
}

export default function Post(prop: PostProp) {
	return (
		<View style={styles.container}>
			{/* Image */}
			<Image source={{ uri: prop.post?.image }} style={styles.image} />
			{/* Comment */}
			<Text style={styles.comment}>
				{prop.post?.comment} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, odio
				commodi magni consequatur officia nam voluptatem molestiae, doloribus animi eaque assumenda
				distinctio voluptas nesciunt culpa deleniti! Ducimus et porro asperiores.
			</Text>
			{/* Actions */}
			<View style={styles.actions}>
				<Pressable style={styles.button}>
					<Ionicons name="heart-outline" size={25} color="#333" />
					<Text>{prop.post?.likeCount}</Text>
				</Pressable>
				<Pressable style={styles.button}>
					<Ionicons name="md-chatbubble-outline" size={25} />
					<Text>{prop.post?.comments.length}</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E0E0E0",
		width: "100%",
		height: 500,
		justifyContent: "space-evenly",
		borderRadius: 8
	},
	comment: {
		textAlign: "center",
		marginHorizontal: 20
	},
	image: {
		alignSelf: "center",
		width: "90%",
		height: 250,
		resizeMode: "contain"
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		margin: 10
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		gap: 7,
		marginHorizontal: 15,
		backgroundColor: "#efeff0",
		padding: 8,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderWidth: 0.5,
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowColor: "#000000",
		shadowOpacity: 0.5
	}
});

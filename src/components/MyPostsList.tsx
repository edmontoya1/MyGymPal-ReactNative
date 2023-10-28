import React, { useCallback } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";

import Post from "./Post";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setCurrentPost } from "../redux/slices/postSlice";
import { IPost } from "../types/post.definition";

type Props = {
	posts: IPost[] | null;
};

const MyPostsList = ({ posts }: Props) => {
	const dispatch = useAppDispatch();

	const handleViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems.length > 0) {
				const currentViewablePost: IPost = viewableItems[0].item;
				dispatch(setCurrentPost(currentViewablePost));
			} else {
				dispatch(setCurrentPost(null));
			}
		},
		[]
	);
	return (
		<FlatList
			data={posts}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item, index }) => (
				<View style={[posts && index === posts?.length - 1 && styles.lastItem]}>
					<Post post={item} />
				</View>
			)}
			decelerationRate="fast"
			snapToInterval={560}
			snapToAlignment="start"
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 1
			}}
			onViewableItemsChanged={handleViewableItemsChanged}
			initialNumToRender={10} // Initial number of items to render
			maxToRenderPerBatch={10} // Maximum number of items to render per batch
			windowSize={5} // Number of items to keep in the rendering window
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default MyPostsList;

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16
	},
	title: {
		fontSize: 18
	},
	lastItem: {
		marginBottom: 100 // Add extra margin for the last item
	},
	separator: {
		height: 60,
		backgroundColor: "transparent"
	}
});

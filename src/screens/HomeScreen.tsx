import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ViewToken,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { HomeStackNavigationProp } from "../types/screens.definition";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  fetchAllUsers,
  getLoadedUsersError,
  getLoadedUsersStatus,
  getUsersMap,
  selectLoadedUsers,
  setUsersMap,
} from "../redux/slices/usersSlice";
import MiniProfile from "../components/MiniProfile";
import {
  fetchAllPosts,
  getPostsError,
  getPostsStatus,
  selectCurrentPost,
  selectPosts,
  setCurrentPost,
} from "../redux/slices/postSlice";
import Post from "../components/Post";
import { IPost } from "../types/post.interface";
import { IUser } from "../types/user.interface";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const loadedUsers = useAppSelector(selectLoadedUsers);
  const loadedUsersStatus = useAppSelector(getLoadedUsersStatus);
  const loadedUsersError = useAppSelector(getLoadedUsersError);
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const postsError = useAppSelector(getPostsError);
  const currentPost = useAppSelector(selectCurrentPost);
  const usersMap = useAppSelector(getUsersMap);
  const [isMapSet, setIsMapSet] = useState<Boolean>(false);

  useEffect(() => {
    if (loadedUsersStatus === "idle") {
      dispatch(fetchAllUsers());
    }

    // Could be refactored
    if (loadedUsersStatus === "succeeded" && loadedUsers && isMapSet == false) {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.miniProfileContainer}>
        {loadedUsersStatus === "loading" || currentPost == null ? (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <MiniProfile user={usersMap[currentPost?.username]} />
        )}
      </View>
      <View style={styles.flatListContainer}>
        {postsStatus === "loading" ? (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  posts && index === posts?.length - 1 && styles.lastItem,
                ]}
              >
                <Post post={item} />
              </View>
            )}
            decelerationRate={"fast"}
            snapToInterval={560}
            snapToAlignment="start"
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 1,
            }}
            onViewableItemsChanged={handleViewableItemsChanged}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    height: Dimensions.get("window").height,
    alignItems: "center",
    gap: 10,
  },
  miniProfileContainer: {
    width: Dimensions.get("window").width * 0.9,
    flex: 1,
  },
  flatListContainer: {
    width: Dimensions.get("window").width * 0.9,
    flex: 3,
  },
  separator: {
    height: 60,
    backgroundColor: "transparent",
  },
  loading: {
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    flex: 1,
  },
  lastItem: {
    marginBottom: 100, // Add extra margin for the last item
  },
});

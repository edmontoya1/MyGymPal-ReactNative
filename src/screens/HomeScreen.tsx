import {
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HomeStackNavigationProp } from "../types/screens.definition";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import MiniProfile from "../components/MiniProfile";
import Post from "../components/Post";
import { setCurrentIndexSlice } from "../redux/slices/usersSlice";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { setLoadedUsers } from "../redux/slices/usersSlice";
import { faker } from "@faker-js/faker";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { IPost } from "../types/post.interface";
import { setPosts } from "../redux/slices/postSlice";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.user);
  const usersSlice = useAppSelector((state) => state.users);
  const postSlice = useAppSelector((state) => state.post);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const posts = snapshot.docs;
        const formattedPosts: IPost[] = posts.map((doc) => {
          const { token, username, profileImg, timestamp, image } = doc.data(); // Assuming data() returns the post data
          const formattedTimeStamp = timestamp.toDate().toISOString();
          return {
            token,
            username,
            profileImg,
            timestamp: formattedTimeStamp,
            image,
          };
        });
        dispatch(setPosts(formattedPosts));
      }
    );
  }, [db]);

  const onViewableItemsChanged = useRef(({ viewableItems, changed }: any) => {
    if (viewableItems.length > 0) {
      // Get the index of the first visible item
      const firstVisibleIndex = viewableItems[0].index || 0;
      dispatch(setCurrentIndexSlice(firstVisibleIndex));
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.miniProfile}>
        {!loading ? (
          <MiniProfile user={usersSlice.loadedUsers[usersSlice.currentIndex]} />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </View>
      <View style={styles.postContainer}>
        {!loading ? (
          <FlatList
            data={postSlice.posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item, index) => index.toString()}
            decelerationRate={"fast"}
            //onEndReached={}
            snapToInterval={Dimensions.get("window").height - 75}
            snapToAlignment="start"
            //onEndReached={fetchData}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 1, // Adjust as needed
            }}
          />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
          </View>
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
  miniProfile: {
    width: "90%",
    backgroundColor: "#e2e2e2",
    flex: 1,
    borderRadius: 15,
  },
  postContainer: {
    width: "90%",
    flex: 3,
    marginBottom: 60,
    borderRadius: 15,
  },
  loading: {
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    flex: 1,
  },
});

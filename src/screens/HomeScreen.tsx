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

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.user);
  const usersSlice = useAppSelector((state) => state.users);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uploadPost = async () => {
      // Create post in firebase
      const docRef = await addDoc(collection(db, "posts"), {
        username: userSlice.username,
        token: userSlice.id,
        profileImg: userSlice.photoUrl,
        timestamp: serverTimestamp(),
      });
      console.log(docRef.id);
      // upload image to firebase storage
      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      const uploadImageToFirebase = async () => {
        // Assuming the PNG file is in the 'images' folder
        const filePath = `posts/${docRef.id}/image/favicon.png`; // Adjust the path as needed

        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, filePath);

        // Assume you have the PNG file as a Base64 string or ArrayBuffer
        const base64Data = "BASE64_DATA_OR_ARRAYBUFFER";

        // Convert the Base64 string or ArrayBuffer to a Blob
        const blob = new Blob([base64Data], { type: "image/png" });

        // Create a File object from the Blob
        const file = new File([blob], "example.png", { type: "image/png" });

        try {
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadUrl,
          });
          console.log("File uploaded successfully!", snapshot);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      uploadImageToFirebase();
      // const storageRef = ref(storage, "");

      // await uploadString(imageRef, "favicon.png", "data_url").then(
      //   async (snapshot) => {
      //     const downloadUrl = await getDownloadURL(imageRef);
      //     await updateDoc(doc(db, "posts", docRef.id), {
      //       image: downloadUrl,
      //     });
      //   }
      // );
    };

    const fetchUsers = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
      dispatch(setLoadedUsers(fetchedUsers));
      setLoading(false);
    };

    uploadPost();
    fetchUsers();

    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const posts = snapshot.docs;
        console.log("posts: ", posts.length);
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
            data={usersSlice.loadedUsers}
            renderItem={({ item }) => <Post users={item} />}
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

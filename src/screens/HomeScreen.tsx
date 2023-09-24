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
import { DocumentData, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setLoadedUsers } from "../redux/slices/usersSlice";
import { faker } from "@faker-js/faker";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const usersSlice = useAppSelector((state) => state.users);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
      dispatch(setLoadedUsers(fetchedUsers));
      setLoading(false);
    };
    fetchUsers();
  }, []);

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

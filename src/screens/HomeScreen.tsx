import {
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HomeStackNavigationProp } from "../types/screens.definition";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { User, fakeItems } from "../lib/data";
import MiniProfile from "../components/MiniProfile";
import Post from "../components/Post";
import { setCurrentIndexSlice } from "../redux/slices/usersSlice";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.users);
  const [users, setUsers] = useState<User[] | []>([]);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  useEffect(() => {
    setUsers(fakeItems);
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems, changed }: any) => {
    if (viewableItems.length > 0) {
      // Get the index of the first visible item
      const firstVisibleIndex = viewableItems[0].index || 0;
      setCurrentVisibleIndex(firstVisibleIndex);
      dispatch(setCurrentIndexSlice(firstVisibleIndex));
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.miniProfile}>
        <MiniProfile user={users[userSlice.currentIndex]} />
      </View>
      <View style={styles.postContainer}>
        <FlatList
          data={users}
          renderItem={({ item }) => <Post users={item} />}
          keyExtractor={(item, index) => index.toString()}
          decelerationRate={"fast"}
          //onEndReached={}
          snapToInterval={Dimensions.get("window").height - 75}
          snapToAlignment="start"
          //onEndReached={fetchData}
          contentContainerStyle={styles.post}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 1, // Adjust as needed
          }}
        />
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
    width: "80%",
    backgroundColor: "#e2e2e2",
    flex: 1,
    borderRadius: 15,
  },
  postContainer: {
    backgroundColor: "blue",
    width: "80%",
    flex: 3,
    marginBottom: 60,
  },
  post: {
    backgroundColor: "black",
  },
});

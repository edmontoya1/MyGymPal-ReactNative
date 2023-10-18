import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { getHomeGyms } from "../redux/slices/gymSlice";
import DropdownList from "./DropdownList";
import {
  getPostsStatus,
  selectImageToUpload,
  uploadPost,
} from "../redux/slices/postSlice";

const PostForm = () => {
  const dispatch = useAppDispatch();
  const homeGymsList = useAppSelector(getHomeGyms);
  const userUploadImageUri = useAppSelector(selectImageToUpload);
  const postStatus = useAppSelector(getPostsStatus);
  const [comment, setComment] = useState<string>("");

  const handleUploadPost = async () => {
    dispatch(uploadPost({ userUploadImageUri, comment }));
  };

  return (
    <SafeAreaView>
      {postStatus === "loading" ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <>
          <Image
            source={{ uri: userUploadImageUri }}
            style={{ width: 200, height: 200 }}
          />
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
          />
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
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loading: {
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

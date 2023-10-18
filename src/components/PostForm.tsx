import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks/hooks";
import { getHomeGyms } from "../redux/slices/gymSlice";
import { TGym } from "../utils/gym";
import DropdownList from "./DropdownList";

type Props = {
  imageURL: string;
};

const PostForm = (props: Props) => {
  const homeGymsList = useAppSelector(getHomeGyms);
  const [comment, setComment] = useState<string>("");

  return (
    <View>
      <Image
        source={{ uri: props.imageURL }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />
      <DropdownList />
      {/* <TextInput style={styles.input} value={gym} onChangeText={setGym} /> */}
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";

type Props = {
  imageURL: string;
};

const Form = (props: Props) => {
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
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

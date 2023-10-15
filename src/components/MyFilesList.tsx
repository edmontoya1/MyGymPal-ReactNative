import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  files: { name: string }[] | undefined;
};

const MyFilesList = ({ files }: Props) => {
  const Item = ({ name }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
  return (
    <FlatList
      data={files}
      renderItem={({ item }) => <Item name={item.name} />}
      keyExtractor={(item) => item.name}
      initialNumToRender={10} // Initial number of items to render
      maxToRenderPerBatch={10} // Maximum number of items to render per batch
      windowSize={5} // Number of items to keep in the rendering window
    />
  );
};

export default MyFilesList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

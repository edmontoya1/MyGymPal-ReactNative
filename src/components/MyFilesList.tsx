import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const MyFilesList = ({ files }: any) => {
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

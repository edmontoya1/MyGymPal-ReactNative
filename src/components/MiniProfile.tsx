import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { User } from "../lib/data";
import React from "react";
import tw from "../lib/tailwind";

export default function MiniProfile(prop: { user: User | null }) {
  const handleAddFriend = () => {
    alert("Add Friend");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header}>
          <Image source={require("../assets/icon.png")} style={styles.img} />
          <Text
            style={{ marginLeft: 10, fontWeight: "bold", width: 150 }}
            numberOfLines={1}
          >
            {prop.user?.first_name} {prop.user?.last_name}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
          <Text style={{ fontSize: 12 }}>Add Friend</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.records}>
        <View style={styles.recordsInfo}>
          <Text>PR's</Text>
        </View>
        <View style={styles.recordsInfo}>
          <Text>S: {250}</Text>
        </View>
        <View style={styles.recordsInfo}>
          <Text>B: {250}</Text>
        </View>
        <View style={styles.recordsInfo}>
          <Text>D: {250}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.infoStat}>
          <Text style={styles.text}>{250}</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.infoStat}>
          <Text style={styles.text}>{250}</Text>
          <Text>Followers</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: "100%",
    padding: 5,
  },
  header: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  records: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  recordsInfo: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 15,
  },
  infoStat: {
    backgroundColor: "blue",
    borderRadius: 15,
    padding: 10,
  },
  img: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 75,
    height: 30,
    borderRadius: 15,
    padding: 5,
  },
  text: {
    textAlign: "center",
  },
});

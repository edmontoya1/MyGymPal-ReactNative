import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HomeStackNavigationProp } from "../types/screens.definition";
import { auth } from "../firebase/firebase";
import tw from "../lib/tailwind";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setToken } from "../redux/slices/userSlice";
import { User } from "../lib/data";
import MiniProfile from "../components/MiniProfile";
import Post from "../components/Post";

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetch("https://random-data-api.com/api/v2/users", {
          method: "GET",
        });
        const data = await users.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(async () => {
        console.log("Sign out");
        await SecureStore.deleteItemAsync("userToken");
        dispatch(setToken(null));
      })
      .catch((error) => alert(error));
  };

  return (
    <SafeAreaView style={tw`bg-background h-full`}>
      <View style={tw`w-80 h-full mx-auto gap-15`}>
        <View style={tw`flex-1 bg-secondaryGray/20 rounded-xl`}>
          <MiniProfile user={users} />
        </View>
        <View style={tw`flex-2 bg-secondaryGray/20 rounded-xl`}>
          <Post users={users} />
        </View>
      </View>
    </SafeAreaView>
  );
}

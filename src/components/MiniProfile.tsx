import { View, Text, Image, Button, Pressable } from "react-native";
import { User } from "../lib/data";
import React from "react";
import tw from "../lib/tailwind";

export default function MiniProfile(prop: { user: User | null }) {
  const handleAddFriend = () => {
    alert("Add Friend");
  };

  return (
    <View style={tw`h-full w-full rounded-xl bg-secondaryGray/20`}>
      <View style={tw`flex-1 flex-row items-center m-2`}>
        <View style={tw`flex-row gap-3 items-center`}>
          <Image
            source={require("../assets/favicon.png")}
            style={tw`rounded-full border`}
          />
          <Text
            style={tw`font-bold text-white`}
          >{`${prop.user?.first_name} ${prop.user?.last_name}`}</Text>
        </View>
        <View style={tw`flex-1 items-end`}>
          <Pressable
            onPress={handleAddFriend}
            style={tw`bg-primaryWhite p-2 rounded-lg`}
          >
            <Text>Add Friend</Text>
          </Pressable>
        </View>
      </View>

      <View style={tw`flex-1 flex-row justify-between items-center m-2`}>
        <View style={tw`rounded-lg bg-primaryWhite p-1`}>
          <Text>PR's</Text>
        </View>
        <View style={tw`rounded-lg bg-primaryWhite p-1`}>
          <Text>S:225 lb</Text>
        </View>
        <View style={tw`rounded-lg bg-primaryWhite p-1`}>
          <Text>B: 225 lb</Text>
        </View>
        <View style={tw`rounded-lg bg-primaryWhite p-1`}>
          <Text>D: 225 lb</Text>
        </View>
      </View>

      <View style={tw`flex-2 flex-row justify-around items-center mb-2`}>
        <View style={tw`rounded-md bg-secondaryGray/20 p-5`}>
          <Text style={tw`text-center text-white`}>287</Text>
          <Text style={tw`text-white`}>Followers</Text>
        </View>
        <View style={tw`rounded-md bg-secondaryGray/20 p-5`}>
          <Text style={tw`text-center text-white`}>45</Text>
          <Text style={tw`text-white`}>Workouts</Text>
        </View>
      </View>
    </View>
  );
}

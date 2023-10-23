import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { fetchUserById, setToken } from "../redux/slices/userSlice";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import "react-native-gesture-handler";
import EmptyScreen from "../screens/EmptyScreen";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { pickAndGetImage, takePhoto } from "../utils/camera";
import { setImageToUpload } from "../redux/slices/postSlice";
import { PostScreenNavigationProp } from "../types/screens.definition";
import PostForm from "../components/PostForm";
import SearchScreen from "../screens/SearchScreen";
import InboxScreen from "../screens/InboxScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppStackScreen({
  navigation,
}: {
  navigation: PostScreenNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ["Take Photo", "Upload From Camera Roll", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex, // Take Photo
      },
      (i?: number) => {
        switch (i) {
          case 1:
            // Upload From Camera
            pickAndGetImage().then((imageUri) => {
              dispatch(setImageToUpload(imageUri));
              if (imageUri != undefined) {
                console.log(imageUri);
                navigation.navigate("PostFormScreen");
              }
            });
            break;
          case destructiveButtonIndex:
            // Take Picture from Camera
            takePhoto().then((imageUri) => {
              dispatch(setImageToUpload(imageUri));
              if (imageUri != undefined) {
                navigation.navigate("PostFormScreen");
              }
            });
            break;

          case cancelButtonIndex:
            console.log("Cancel button");
          // Canceled
        }
      }
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          bottom: 30,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 10,
          shadowColor: "#000000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.icon}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.icon}>
                <FontAwesome5
                  name="search"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ImagePickerTab"
        component={EmptyScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={onPress}>
              <View style={styles.plusIconContainer}>
                <Image
                  source={require("../assets/plus.png")}
                  style={styles.plusIcon}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="InboxTab"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.icon}>
                <FontAwesome5
                  name="inbox"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.icon}>
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const logIn = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      const userDocId = await SecureStore.getItemAsync("userDocId");

      if (token && userDocId) {
        setIsSignedIn(true);
        dispatch(setToken(token));
        dispatch(fetchUserById(userDocId));
      } else {
        setIsSignedIn(false);
        dispatch(setToken(null));
      }
    };
    logIn();
  }, [user.token, user.user]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.token !== null && isSignedIn ? (
          <>
            <Stack.Screen name="AppStackScreen" component={AppStackScreen} />
            <Stack.Screen name="PostFormScreen" component={PostForm} />
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: "50%",
  },
  plusIcon: {
    width: 22,
    height: 22,
    tintColor: "white",
  },
  plusIconContainer: {
    width: 55,
    height: 55,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});

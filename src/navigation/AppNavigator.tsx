import React, { useEffect, useState } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setToken } from "../redux/slices/userSlice";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function AppStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: 60,
          borderRadius: 15,
          bottom: 25,
          left: 25,
          right: 25,
          elevation: 0,
          backgroundColor: "#D9D9D9",
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = async () => {
      const token = await SecureStore.getItemAsync("userToken");

      if (token) {
        setIsSignedIn(true);
        dispatch(setToken(token));
      } else {
        setIsSignedIn(false);
        dispatch(setToken(null));
      }
    };
    loggedIn();
  }, [user.token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.token !== null && isSignedIn ? (
          <Stack.Screen name="AppStackScreen" component={AppStackScreen} />
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

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type WelcomeScreenRouteProp = RouteProp<
  RootStackParamList,
  "WelcomeScreen"
>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WelcomeScreen"
>;
export type SignUpScreenRouteProp = RouteProp<
  RootStackParamList,
  "SignUpScreen"
>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUpScreen"
>;
export type SignInScreenRouteProp = RouteProp<
  RootStackParamList,
  "SignInScreen"
>;
export type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignInScreen"
>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "HomeScreen">;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;
export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProfileScreen"
>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	WelcomeScreen: undefined;
	SignInScreen: undefined;
	SignUpScreen: undefined;
	AppStackScreen: undefined;
	ProfileScreen: undefined;
	PostFormScreen: undefined;
	SearchScreen: undefined;
	EditProfileScreen: {
		email: string;
		password: string;
	};
};

export type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "WelcomeScreen">;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"WelcomeScreen"
>;
export type SignUpScreenRouteProp = RouteProp<RootStackParamList, "SignUpScreen">;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"SignUpScreen"
>;
export type SignInScreenRouteProp = RouteProp<RootStackParamList, "SignInScreen">;
export type SignInScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"SignInScreen"
>;
export type HomeStackRouteProp = RouteProp<RootStackParamList, "AppStackScreen">;
export type HomeStackNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"AppStackScreen"
>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ProfileScreen">;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"ProfileScreen"
>;
export type PostScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"AppStackScreen"
>;
export type SearchScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"SearchScreen"
>;

// Edit Screen
export type EditProfileScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"EditProfileScreen"
>;

export type EditProfileScreenRouteProp = RouteProp<RootStackParamList, "EditProfileScreen">;

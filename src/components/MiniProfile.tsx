import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { IUser } from "../types/user.definition";

interface MiniProfileProps {
	user: IUser | null;
}

export default function MiniProfile(prop: MiniProfileProps) {
	const handleAddFriend = () => {
		alert("Add Friend");
	};

	return (
		<View style={styles.container}>
			{/* Top */}
			<View style={styles.header}>
				<View style={styles.header}>
					<Image source={require("../assets/icon.png")} style={styles.img} />
					<Text style={{ marginLeft: 10, fontWeight: "bold", width: 150 }} numberOfLines={1}>
						{prop.user?.username}
					</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={handleAddFriend}>
					<Text style={{ fontSize: 12 }}>Add Friend</Text>
				</TouchableOpacity>
			</View>

			{/* Middle */}
			<View style={styles.records}>
				<View style={styles.recordsInfo}>
					<Text>PR's</Text>
				</View>
				<View style={styles.recordsInfo}>
					<Text>S: {prop.user?.pr_squat}</Text>
				</View>
				<View style={styles.recordsInfo}>
					<Text>B: {prop.user?.pr_bench}</Text>
				</View>
				<View style={styles.recordsInfo}>
					<Text>D: {prop.user?.pr_deadlift}</Text>
				</View>
			</View>

			{/* Bottom */}
			<View style={styles.info}>
				<View style={styles.infoStat}>
					<Text style={styles.text}>{prop.user?.followers_count}</Text>
					<Text>Followers</Text>
				</View>
				<View style={styles.infoStat}>
					<Text style={styles.text}>{prop.user?.following_count}</Text>
					<Text>Following</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E0E0E0",
		borderRadius: 20,
		height: "100%",
		padding: 5
	},
	header: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	records: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	info: {
		flex: 1,
		justifyContent: "space-around",
		flexDirection: "row"
	},
	recordsInfo: {
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 15
	},
	infoStat: {
		backgroundColor: "blue",
		borderRadius: 15,
		padding: 10
	},
	img: {
		borderRadius: 50,
		width: 50,
		height: 50
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		width: 75,
		height: 30,
		borderRadius: 15,
		padding: 5
	},
	text: {
		textAlign: "center"
	}
});

import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

interface ICustomInput {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
	secureTextEntry: boolean;
	field: string;
}

export default function CustomInput({
	value,
	setValue,
	placeholder,
	secureTextEntry,
	field
}: ICustomInput) {
	return (
		<View>
			<Text style={styles.container}>{field}</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={value}
					onChangeText={setValue}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					style={styles.input}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		color: "white",
		marginBottom: 5
	},
	inputContainer: {
		width: 200,
		borderWidth: 2,
		justifyContent: "center",
		borderRadius: 10,
		height: 40,
		backgroundColor: "white"
	},
	input: {
		padding: 5
	}
});

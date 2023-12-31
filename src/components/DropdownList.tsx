import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useAppSelector } from "../redux/hooks/hooks";
import { getHomeGyms } from "../redux/slices/gymSlice";
import { IGym } from "../types/gym.definition";

const DropdownList = () => {
	const homeGyms = useAppSelector(getHomeGyms);
	const [value, setValue] = useState<{ label: string; value: IGym } | null>();
	const [gymData, setGymData] = useState<{ label: string; value: IGym }[]>([]);

	useEffect(() => {
		for (const gym in homeGyms) {
			const newData: {
				label: string;
				value: IGym;
			}[] = [];
			const { name } = homeGyms[gym];

			Object.keys(homeGyms).forEach((key) => {
				newData.push({ label: name, value: homeGyms[key] });
			});
			setGymData(newData);
		}
	}, []);

	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			inputSearchStyle={styles.inputSearchStyle}
			iconStyle={styles.iconStyle}
			data={gymData}
			search
			maxHeight={300}
			labelField="label"
			valueField="value"
			placeholder="Select Gym"
			searchPlaceholder="Search..."
			value={value}
			onChange={(Gym) => {
				setValue(Gym);
			}}
			renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
		/>
	);
};

export default DropdownList;

const styles = StyleSheet.create({
	dropdown: {
		margin: 16,
		height: 50,
		borderBottomColor: "gray",
		borderBottomWidth: 0.5
	},
	icon: {
		marginRight: 5
	},
	placeholderStyle: {
		fontSize: 16
	},
	selectedTextStyle: {
		fontSize: 16
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	}
});

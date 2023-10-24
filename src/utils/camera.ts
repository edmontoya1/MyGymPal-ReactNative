import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const takePhoto = async () => {
	try {
		const cameraResp = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1
		});

		if (!cameraResp.canceled) {
			const { uri } = cameraResp.assets[0];
			return uri;
			// const formattedFiles = listFiles().then((listResp) => {
			//   const files = listResp.map((value) => {
			//     return { name: value.fullPath };
			//   });

			//   return files;
			// });
			// return formattedFiles;
		} else {
			console.log("Inside cancell");
		}
	} catch (e: any) {
		Alert.alert("Error Uploading Image " + e.message);
	}
};

// temporary commented out, this allows for picture picking
const pickAndGetImage = async () => {
	// No permissions request is necessary for launching the image library
	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		aspect: [4, 5],
		quality: 1
	});
	// Currently uploads to firebase
	if (!result.canceled) {
		const { uri } = result.assets[0];
		return uri;
	}
};

export { takePhoto, pickAndGetImage };

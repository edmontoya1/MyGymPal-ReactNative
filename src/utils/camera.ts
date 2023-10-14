import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { uploadToFirebase, listFiles } from "../firebase/firebase";

const takePhoto = async () => {
  try {
    const cameraResp = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!cameraResp.canceled) {
      const { uri } = cameraResp.assets[0];
      const fileName = uri.split("/").pop();
      const uploadResp = await uploadToFirebase(uri, fileName, (v: any) =>
        console.log(v)
      );
      console.log(uploadResp);

      const formattedFiles = listFiles().then((listResp) => {
        const files = listResp.map((value) => {
          return { name: value.fullPath };
        });

        return files;
      });
      return formattedFiles;
    }
  } catch (e: any) {
    Alert.alert("Error Uploading Image " + e.message);
  }
};

export { takePhoto };

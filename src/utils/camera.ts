import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { uploadToFirebase, listFiles } from "../firebase/firebase";
import { useAppDispatch } from "../redux/hooks/hooks";

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
      const uploadResp = await uploadToFirebase(uri, fileName, (v: number) =>
        console.log(v)
      );

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

// temporary commented out, this allows for picture picking
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [10, 4],
    quality: 1,
  });

  if (!result.canceled) {
    const { uri } = result.assets[0];
    const fileName = uri.split("/").pop();
    const uploadResp = await uploadToFirebase(uri, fileName, (v: any) => {
      console.log(v);
      // console.log(parseFloat(v) / 0.01);
    });

    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });
    });
  }
};

export { takePhoto, pickImage };

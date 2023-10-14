import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  SafeAreaView,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Form from "../components/Form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { listFiles, uploadToFirebase } from "../firebase/firebase";
import { StatusBar } from "expo-status-bar";
import { takePhoto } from "../utils/camera";
import MyFilesList from "../components/MyFilesList";

export default function ImagePickerScreen() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const [files, setFiles] = useState<{ name: string }[] | undefined>([]);

  useEffect(() => {
    listFiles().then((listResponse) => {
      const files = listResponse.map((value) => {
        return { name: value.fullPath };
      });
      setFiles(files);
    });
  }, []);

  // temporary commented out, this allows for picture picking
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 4],
      quality: 1,
    });

    console.log(JSON.stringify(result, null, 2));

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const fileName = uri.split("/").pop();
      const uploadResp = await uploadToFirebase(uri, fileName, (v: any) =>
        console.log("Time: ", v)
      );
      console.log(JSON.stringify(uploadResp, null, 2));

      listFiles().then((listResp) => {
        const files = listResp.map((value) => {
          return { name: value.fullPath };
        });

        setFiles(files);
      });
    }
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <Button title="Request Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }
  console.log(files);
  return (
    <SafeAreaView style={styles.container}>
      {/* {image ? (
        <View>
          <Button title="<" onPress={() => setImage(null)} />
          <Form imageURL={image} />
        </View>
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )} */}
      <Text>Working with firbase and image picker</Text>
      <MyFilesList files={files} />
      <Button
        title="Take Photo"
        onPress={() => takePhoto().then((files) => setFiles(files))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

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
import { pickImage, takePhoto } from "../utils/camera";
import MyFilesList from "../components/MyFilesList";
import MyProgressBar from "../components/MyProgressBar";
import { useAppSelector } from "../redux/hooks/hooks";

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

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <Button title="Request Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Working with firbase and image picker</Text>
      <Button
        title="Take Photo"
        onPress={() => takePhoto().then((files) => setFiles(files))}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    backgroundColor: "#fff",
  },
});

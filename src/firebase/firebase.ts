// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IUser } from "../types/user.definition";
import * as SecureStore from "expo-secure-store";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

const listFiles = async () => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};

const createUser = async (user: IUser) => {
  const { email, firstName, lastName, photoUri, username, password } = user;
  // create auth
  const userAuth = await createUserWithEmailAndPassword(
    auth,
    email,
    password as string
  ).catch((error) => {
    // Error creating user auth
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage);
    return null;
  });
  if (userAuth) {
    const userAuthToken = await userAuth.user.getIdToken();
    let newUser = user;
    // TODO: need to hash password
    newUser = {
      ...newUser,
      userUID: userAuth.user.uid,
      token: userAuthToken,
    };
    delete newUser.password;
    // Create user doc for database
    const userDoc = await addDoc(collection(db, "users"), newUser);
    // Set userDoc's id in storage
    await SecureStore.setItemAsync("userDocId", userDoc.id);
    return { token: userAuthToken, userDoc: newUser };
  } else {
    return null;
  }
};

const uploadToFirebase = async (
  uri: string | undefined,
  name: string | undefined,
  onProgress: (progress: number) => void
) => {
  if (uri) {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  }
};

export { auth, db, storage, uploadToFirebase, listFiles, createUser };

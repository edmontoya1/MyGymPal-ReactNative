import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
	initializeAuth,
	getReactNativePersistence,
	createUserWithEmailAndPassword,
	UserCredential
} from "firebase/auth";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where
} from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from "firebase/storage";

import { UploadResponse } from "../types/firebase.definition";
import { IUser, UserAuth, UserSignUp } from "../types/user.definition";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
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

/**
 * Creates a new user auth account
 * @param user The user to create new auth account
 * @returns {Promise<UserCredential | undefined>} User Auth Account
 */
export const createUserAuth = async (user: UserAuth) => {
	try {
		return await createUserWithEmailAndPassword(auth, user.email, user.password);
	} catch (error) {
		console.log(error);
	}
};

/**
 *
 * @param userCredential Created Auth credential
 * @param user User to create new document
 * @returns {Promise<{userCredential: UserCredential;userDoc: DocumentReference<DocumentData, DocumentData>;userToCreate: IUser;} | undefined>}
 * An object containing the user auth credentials, the new user's document, and the new user object
 */
export const linkUserAuthToNewUserDoc = async (
	userCredential: UserCredential,
	user: UserSignUp
) => {
	try {
		const userAuthToken = await userCredential.user.getIdToken();
		const userToCreate: IUser = {
			...user,
			userUID: userCredential.user.uid,
			followers_count: 0,
			following_count: 0,
			pr_squat: 0,
			pr_bench: 0,
			pr_deadlift: 0,
			username: user.userName,
			token: userAuthToken
		};
		delete userToCreate.password;
		const userDoc = await addDoc(collection(db, "users"), userToCreate);
		return { userCredential, userDoc, userToCreate };
	} catch (error) {
		console.log(error);
	}
};

/**
 * Creates a new linked user auth and user doc account.
 * @returns {UserCredential} The user's auth
 * @returns {DocumentReference<DocumentData, DocumentData>} The user's document
 * @returns {IUser} The created user
 */
export const createUserAuthAndDoc = async (user: UserSignUp) => {
	try {
		return await createUserWithEmailAndPassword(auth, user.email, user.password).then(
			async (userCredential) => {
				const userAuthToken = await userCredential.user.getIdToken();
				const userToCreate: IUser = {
					...user,
					userUID: userCredential.user.uid,
					followers_count: 0,
					following_count: 0,
					pr_squat: 0,
					pr_bench: 0,
					pr_deadlift: 0,
					username: user.userName,
					token: userAuthToken
				};
				delete userToCreate.password;
				const userDoc = await addDoc(collection(db, "users"), userToCreate);
				return { userCredential, userDoc, userToCreate };
			}
		);
	} catch (error) {
		console.log(error);
		alert(error);
	}
};

/**
 * Fetches the user document by the user's document ID
 * @param id The user's document id
 * @returns {Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined>}
 * Promise where resolved, returns the users document, else undefined
 */
export const fetchUserById = async (id: string) => {
	try {
		const docRef = doc(db, "users", id);
		const docSnap = await getDoc(docRef);
		return docSnap;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Fetches the user document using the user's Auth ID
 * @param id The user's auth UID
 * @returns {Promise<QuerySnapshot<DocumentData, DocumentData> | undefined>}
 * Promise where resolved, returns the users document, else undefined
 */
export const fetchUserByUID = async (id: string) => {
	try {
		const userRef = collection(db, "users");
		const userQuery = query(userRef, where("userUID", "==", id));
		return getDocs(userQuery).then((userSnapshot) => userSnapshot);
	} catch (error) {
		console.log(error);
	}
};

const uploadToFirebase = async (
	uri: string | undefined,
	name: string | undefined,
	authUID: string | undefined,
	onProgress: (progress: number) => void
) => {
	if (uri) {
		const fetchResponse = await fetch(uri);
		const theBlob = await fetchResponse.blob();

		const imageRef = ref(getStorage(), `images/${authUID}/${name}`);

		const uploadTask = uploadBytesResumable(imageRef, theBlob);

		return new Promise<UploadResponse>((resolve, reject) => {
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
						metadata: uploadTask.snapshot.metadata
					});
				}
			);
		});
	}
};

export { auth, db, storage, uploadToFirebase, listFiles };

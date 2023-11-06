import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db, listFiles, uploadToFirebase } from "../../firebase/firebase";
import { IPost } from "../../types/post.definition";
import { RootState } from "../store";

export const fetchAllPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
	try {
		const postsCollection = collection(db, "posts");
		const postQuery = query(postsCollection, orderBy("timestamp", "desc"));
		const postsSnapshot = await getDocs(postQuery);
		const posts = postsSnapshot.docs;
		const formattedPosts: IPost[] = posts.map((doc) => {
			const { token, username, profileImg, timestamp, image } = doc.data(); // Assuming data() returns the post data
			const formattedTimeStamp = timestamp.toDate().toISOString();
			return {
				token,
				username,
				profileImg,
				timestamp: formattedTimeStamp,
				image
			};
		});
		return formattedPosts;
	} catch (error) {
		console.log(error);
		return null;
	}
});

export const uploadPost = createAsyncThunk(
	"posts/uploadPost",
	async ({
		userUploadImageUri,
		comment
	}: {
		userUploadImageUri: string | undefined;
		comment: string;
	}) => {
		const fileName = userUploadImageUri?.split("/").pop();
		const uploadResp = await uploadToFirebase(userUploadImageUri, fileName, (v: any) => {
			console.log("Uploading picked image: ", v);
		});

		return listFiles().then((listResp) => {
			const files = listResp.map((value) => {
				return { name: value.fullPath };
			});
			return files;
		});
	}
);
interface PostState {
	currentPost: IPost | null;
	posts: IPost[] | null;
	imageToUpload: string | undefined;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: null;
}

const initialState: PostState = {
	currentPost: null,
	posts: null,
	imageToUpload: undefined,
	status: "idle",
	error: null
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setCurrentPost: (state, action: PayloadAction<IPost | null>) => {
			state.currentPost = action.payload;
		},
		setPosts: (state, action: PayloadAction<IPost[]>) => {
			state.posts = action.payload;
		},
		setImageToUpload: (state, action: PayloadAction<string | undefined>) => {
			state.imageToUpload = action.payload;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAllPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchAllPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.posts = action.payload;
			})
			.addCase(fetchAllPosts.rejected, (state, action) => {
				state.status = "failed";
			});
		builder
			.addCase(uploadPost.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(uploadPost.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.imageToUpload = undefined;
			})
			.addCase(uploadPost.rejected, (state, action) => {
				state.status = "failed";
			});
	}
});

export const { setCurrentPost, setPosts, setImageToUpload } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const getPostsStatus = (state: RootState) => state.post.status;
export const getPostsError = (state: RootState) => state.post.error;

export const selectCurrentPost = (state: RootState) => state.post.currentPost;
export const selectImageToUpload = (state: RootState) => state.post.imageToUpload;

export default postSlice.reducer;

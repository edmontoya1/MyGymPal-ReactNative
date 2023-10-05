import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types/post.interface";
import { RootState } from "../store";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// onSnapshot(
//   query(collection(db, "posts"), orderBy("timestamp", "desc")),
//   (snapshot) => {
//     const posts = snapshot.docs;
//     const formattedPosts: IPost[] = posts.map((doc) => {
//       const { token, username, profileImg, timestamp, image } = doc.data(); // Assuming data() returns the post data
//       const formattedTimeStamp = timestamp.toDate().toISOString();
//       return {
//         token,
//         username,
//         profileImg,
//         timestamp: formattedTimeStamp,
//         image,
//       };
//     });
//     dispatch(setPosts(formattedPosts));
//   }
// );
export const fetchAllPosts = createAsyncThunk(
  "users/fetchAllPosts",
  async () => {
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
          image,
        };
      });
      return formattedPosts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
interface PostState {
  currentPost: IPost | null;
  currentIndex: number;
  posts: IPost[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null;
}

const initialState: PostState = {
  currentPost: null,
  currentIndex: 0,
  posts: null,
  status: "idle",
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<IPost>) => {
      state.currentPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
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
  },
});

export const { setCurrentPost, setPosts } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const getPostsStatus = (state: RootState) => state.post.status;
export const getPostsError = (state: RootState) => state.post.error;

export const selectCurrentPost = (state: RootState) => state.post.currentPost;
export const selectCurrentIndex = (state: RootState) => state.post.currentIndex;

export default postSlice.reducer;

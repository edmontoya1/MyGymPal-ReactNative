import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types/post.interface";
import { RootState } from "../store";

interface PostState {
  currentPost: IPost | null;
  currentIndex: number;
  posts: IPost[] | null;
}

const initialState: PostState = {
  currentPost: null,
  currentIndex: 0,
  posts: null,
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
});

export const { setCurrentPost, setPosts } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectCurrentPost = (state: RootState) => state.post.currentPost;
export const selectCurrentIndex = (state: RootState) => state.post.currentIndex;

export default postSlice.reducer;

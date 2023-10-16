import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import usersSlice from "./slices/usersSlice";
import postSlice from "./slices/postSlice";
import gymSlice from "./slices/gymSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    post: postSlice,
    gym: gymSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

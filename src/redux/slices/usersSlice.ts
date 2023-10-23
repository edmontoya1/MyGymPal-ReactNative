import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { IUser } from "../../types/user.definition";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      return usersSnapshot.docs.map((user) => user.data() as IUser);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
interface UsersState {
  loadedUsers: IUser[] | null;
  usersMap: { [key: string]: IUser };
  currentIndex: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null;
}

const initialState: UsersState = {
  loadedUsers: null,
  usersMap: {},
  currentIndex: 0,
  status: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoadedUsers: (state, action: PayloadAction<any[]>) => {
      state.loadedUsers = action.payload;
    },
    setUsersMap: (state, action: PayloadAction<{ [key: string]: IUser }>) => {
      state.usersMap = action.payload;
    },
    setCurrentIndexSlice: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loadedUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setLoadedUsers, setCurrentIndexSlice, setUsersMap } =
  usersSlice.actions;

export const selectLoadedUsers = (state: RootState) => state.users.loadedUsers;
export const getLoadedUsersStatus = (state: RootState) => state.users.status;
export const getLoadedUsersError = (state: RootState) => state.users.error;
export const getUsersMap = (state: RootState) => state.users.usersMap;

export default usersSlice.reducer;

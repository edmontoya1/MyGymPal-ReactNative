import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../lib/data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      return usersSnapshot.docs.map((user) => user.data() as User);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
interface UsersState {
  loadedUsers: User[] | null;
  currentIndex: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null;
}

const initialState: UsersState = {
  loadedUsers: null,
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

export const { setLoadedUsers, setCurrentIndexSlice } = usersSlice.actions;

export const selectLoadedUsers = (state: RootState) => state.users.loadedUsers;
export const getLoadedUsersStatus = (state: RootState) => state.users.status;
export const getLoadedUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;

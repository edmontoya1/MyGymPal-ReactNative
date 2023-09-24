import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../lib/data";

interface UsersState {
  loadedUsers: User[] | null;
  currentIndex: number;
}

const initialState: UsersState = {
  loadedUsers: null,
  currentIndex: 0,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoadedUsers: (state, action: PayloadAction<any[]>) => {
      state.loadedUsers = action.payload;
    },
    setCurrentIndexSlice: (state, action: PayloadAction<number>) => {
      console.log("userSlice currentIndex: " + action.payload);
      state.currentIndex = action.payload;
    },
  },
});

export const { setLoadedUsers, setCurrentIndexSlice } = usersSlice.actions;

export const selectLoadedUsers = (state: RootState) => state.users.loadedUsers;

export default usersSlice.reducer;

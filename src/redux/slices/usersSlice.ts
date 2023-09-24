import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../lib/data";

interface UsersState {
  loadedUsers: User[];
  currentIndex: number;
}

const initialState: UsersState = {
  loadedUsers: [],
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
      state.currentIndex = action.payload;
    },
  },
});

export const { setLoadedUsers, setCurrentIndexSlice } = usersSlice.actions;

export const selectLoadedUsers = (state: RootState) => state.users.loadedUsers;

export default usersSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UsersState {
  loadedUsers: [];
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
    setUsers: (state, action: PayloadAction<[]>) => {
      state.loadedUsers = action.payload;
    },
    setCurrentIndexSlice: (state, action: PayloadAction<number>) => {
      console.log("userSlice currentIndex: " + action.payload);
      state.currentIndex = action.payload;
    },
  },
});

export const { setUsers, setCurrentIndexSlice } = usersSlice.actions;

export const selectLoadedUsers = (state: RootState) => state.users.loadedUsers;

export default usersSlice.reducer;

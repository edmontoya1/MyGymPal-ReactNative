import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UsersState {
  loadedUsers: [];
}

const initialState: UsersState = {
  loadedUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<[]>) => {
      state.loadedUsers = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const selectLoadedUsers = (state: RootState) => state.users.loadedUsers;

export default usersSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
}

const initialState: UserState = {
  token: null,
  firstName: null,
  lastName: null,
  gender: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
  },
});

export const { setFirstName, setToken } = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.firstName;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;

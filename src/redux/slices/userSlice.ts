import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
}

const initialState: UserState = {
  firstName: null,
  lastName: null,
  gender: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
  },
});

export const { setFirstName } = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.firstName;

export default userSlice.reducer;

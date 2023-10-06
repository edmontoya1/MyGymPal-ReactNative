import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  token: string | null;
  id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  followers_count: number | null;
  following_count: number | null;
  photoUrl: string | null;
  pr_squat: number | null;
  pr_bench: number | null;
  pr_deadlift: number | null;
  username: string | null;
}

const initialState: UserState = {
  token: null,
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  followers_count: null,
  following_count: null,
  photoUrl: null,
  pr_squat: null,
  pr_bench: null,
  pr_deadlift: null,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setFirstName, setToken, setId } = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.first_name;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;

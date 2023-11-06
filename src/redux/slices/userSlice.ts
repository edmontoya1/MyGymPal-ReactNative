import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../types/user.definition";
import { RootState } from "../store";
interface UserState {
	token: string | null;
	user: IUser | null;
	authUID: string | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: null;
}

const initialState: UserState = {
	token: null,
	user: null,
	authUID: null,
	status: "idle",
	error: null
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		setFirstName: (state, action: PayloadAction<string>) => {
			if (state.user?.firstName) {
				state.user.firstName = action.payload;
			}
		},
		setUserUID: (state, action: PayloadAction<string>) => {
			if (state.user?.userUID) {
				state.user.userUID = action.payload;
			}
		}
	}
});

export const { setFirstName, setToken, setUserUID, setUser } = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.user?.firstName;
export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;

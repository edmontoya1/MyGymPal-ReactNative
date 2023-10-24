import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { IUser } from "../../types/user.definition";
import { RootState } from "../store";

export const fetchUserById = createAsyncThunk("user/fetchUserById", async (id: string) => {
	try {
		const userRef = collection(db, "users");
		// should only recieve one doc
		const userQuery = query(userRef, where("userUID", "==", id));
		return await getDocs(userQuery).then(async (snapshot) => {
			await SecureStore.setItemAsync("userDocId", snapshot.docs[0].id);
			return snapshot.docs[0].data() as IUser;
		});
	} catch (error) {
		return null;
	}
});
interface UserState {
	token: string | null;
	user: IUser | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: null;
}

const initialState: UserState = {
	token: null,
	user: null,
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
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserById.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload;
			})
			.addCase(fetchUserById.rejected, (state, action) => {
				state.status = "failed";
			});
	}
});

export const { setFirstName, setToken, setUserUID, setUser } = userSlice.actions;

export const selectFirstName = (state: RootState) => state.user.user?.firstName;
export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

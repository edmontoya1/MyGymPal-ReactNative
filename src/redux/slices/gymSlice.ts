import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IGym } from "../../types/gym.definition";
import { RootState } from "../store";

interface GymState {
	currentGymName: string | null;
	locationGymLocation: string | null;
	homeGyms: { [key: string]: IGym };
}

const initialState: GymState = {
	currentGymName: null,
	locationGymLocation: null,
	homeGyms: {
		"Gym 1": {
			name: "Gym 1",
			location: "Location 1"
		}
	}
};

export const gymSlice = createSlice({
	name: "gym",
	initialState,
	reducers: {
		setCurrentGymName: (state, action: PayloadAction<string>) => {
			state.currentGymName = action.payload;
		}
	}
});

export const { setCurrentGymName } = gymSlice.actions;

export const getCurrentGymName = (state: RootState) => state.gym.currentGymName;
export const getHomeGyms = (state: RootState) => state.gym.homeGyms;

export default gymSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IGym } from "../../utils/gym";

interface GymState {
  currentGymName: string | null;
  locationGymLocation: string | null;
  homeGyms: IGym[];
}

const initialState: GymState = {
  currentGymName: null,
  locationGymLocation: null,
  homeGyms: [
    { name: "Gym 1", location: "123 St", label: "Gym 1", vale: "Gym 1 123 St" },
  ],
};

export const gymSlice = createSlice({
  name: "gym",
  initialState,
  reducers: {
    setCurrentGymName: (state, action: PayloadAction<string>) => {
      state.currentGymName = action.payload;
    },
  },
});

export const { setCurrentGymName } = gymSlice.actions;

export const getCurrentGymName = (state: RootState) => state.gym.currentGymName;
export const getHomeGyms = (state: RootState) => state.gym.homeGyms;

export default gymSlice.reducer;

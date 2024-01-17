import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rocketslice = createSlice({
  name: "rocketslice",
  initialState: {
    status: "success" as string,
    rockets: [] as Record<string, any>[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = "success";
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = "failed";
        console.error("Rocket data fetch failed:", action.error.message);
      });
  },
});

export const fetchRockets = createAsyncThunk(
  "rockets/fetchRockets",
  async () => {
    try {
      const response = await axios.get(
        " https://api.spacexdata.com/v4/rockets"
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching rocket data:", error.message);
      throw error;
    }
  }
);
export default rocketslice.reducer;

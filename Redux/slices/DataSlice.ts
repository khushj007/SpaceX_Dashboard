import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const dataslice = createSlice({
  name: "dataslice",
  initialState: {
    error: "" as string | undefined,
    status: "succeeded" as string,
    all: [] as Record<string, any>[],
    upcomming: [] as Record<string, any>[],
    latest: [] as Record<string, any>[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all = action.payload;
        const data = [...action.payload];
        const revData = data.reverse();
        state.latest = revData;
      })
      .addCase(fetchAllUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpCommingUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpCommingUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomming = action.payload;
      })
      .addCase(fetchUpCommingUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchAllUserData = createAsyncThunk(
  "dataslice/all",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v5/launches`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching all data:", error.message);
      throw error;
    }
  }
);
export const fetchUpCommingUserData = createAsyncThunk(
  "dataslice/upcomming",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v5/launches/upcoming`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching upcoming data:", error.message);
      throw error;
    }
  }
);

export default dataslice.reducer;

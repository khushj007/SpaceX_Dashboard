import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import DataSlice from "./slices/DataSlice";
import RocketSlice from "./slices/RocketSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    eventdata: DataSlice,
    rocketdata: RocketSlice,
  },
});

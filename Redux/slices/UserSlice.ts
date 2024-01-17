import { createSlice } from "@reduxjs/toolkit";

interface User {
  fname: string;
  lname: string;
  username: string;
  userid: string;
  userImage: string;
}
const userslice = createSlice({
  name: "userslice",
  initialState: {
    fname: "",
    lname: "",
    username: "",
    userid: "",
    userImage: "",
  } as User,
  reducers: {
    adduser: (state, action) => {
      const data = action.payload;
      return {
        ...data,
      };
    },
  },
});

export const { adduser } = userslice.actions;
export default userslice.reducer;

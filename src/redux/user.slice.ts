import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  user: {
    username: string;
    password: string;
  };
  token: string;
  isAuthenticating: boolean;
} = {
  user: {
    username: "",
    password: "",
  },
  token: "",
  isAuthenticating: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        data: { username: string; password: string };
        token: string;
      }>
    ) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.isAuthenticating = true;
    },
    logout: (state) => {
      state.user = {
        username: "",
        password: "",
      };
      state.token = "";
      state.isAuthenticating = false;
    },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;

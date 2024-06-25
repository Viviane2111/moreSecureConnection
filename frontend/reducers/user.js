// reducers/user.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Etat inscription/connexion
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
    // Etat déconnexion
    logout: (state) => {
      state.value.username = null;
      state.value.token = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

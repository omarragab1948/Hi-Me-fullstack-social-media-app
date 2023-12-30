// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  console.log(storedUser);
  return storedUser !== "undefined" ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: loadUserFromLocalStorage(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      // Save user in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      // Clear user from local storage
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;

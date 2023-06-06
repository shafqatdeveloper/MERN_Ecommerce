import { createSlice } from "@reduxjs/toolkit";
import {
  allUsers,
  forgotPassword,
  loadUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
} from "../Actions/userAction.jsx";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    errors: null,
    user: {},
    loggedIn: false,
    updated: false,
    message: null,
    reset: false,
    Users: [],
  },
  reducers: {
    resetState: (state) => {
      state.loggedIn = false;
      state.errors = null;
      state.updated = false;
      state.message = null;
      state.reset = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        errors: null,
        loading: false,
        loggedIn: true,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        errors: action.error.message,
      };
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        errors: null,
        loading: false,
        updated: action.payload.success,
      };
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(loginUser.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        isAuthenticated: true,
        user: action.payload.user,
        loggedIn: true,
        success: action.payload.success,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        errors: action.error.message,
      };
    });
    builder.addCase(loadUser.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        isAuthenticated: true,
        user: action.payload.user,
      };
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        errors: action.error.message,
      };
    });
    builder.addCase(logoutUser.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      (state.loading = false),
        (state.errors = null),
        (state.user = {}),
        (state.isAuthenticated = false);
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        errors: action.error.message,
      };
    });
    builder.addCase(updatePassword.pending, (state) => {
      (state.errors = null), (state.loading = true);
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      (state.errors = null),
        (state.loading = false),
        (state.success = action.payload.success);
    });
    builder.addCase(updatePassword.rejected, (state) => {
      (state.errors = action.error.message), (state.loading = false);
    });
    builder.addCase(forgotPassword.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        message: action.payload.message,
      };
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(resetPassword.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        reset: action.payload.success,
      };
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(allUsers.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(allUsers.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        Users: action.payload.users,
      };
    });
    builder.addCase(allUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
  },
});

export const { resetState } = userSlice.actions;

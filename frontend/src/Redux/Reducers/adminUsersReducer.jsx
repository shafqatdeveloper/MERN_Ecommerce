import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserRole,
} from "../Actions/adminUsersAction.jsx";

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    loading: false,
    errors: null,
    users: [],
    user: {},
    deleted: false,
    updated: false,
  },
  reducers: {
    resetState: (state) => {
      (state.deleted = false), (state.errors = null), (state.updated = false);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload.users,
        loading: false,
        errors: null,
      };
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(getSingleUser.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        errors: null,
      };
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(deleteUser.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        deleted: action.payload.success,
      };
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(updateUserRole.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: null,
        updated: action.payload.success,
      };
    });
    builder.addCase(updateUserRole.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
  },
});

export const { resetState } = adminUsersSlice.actions;

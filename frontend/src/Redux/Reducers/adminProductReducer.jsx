import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updatedProduct,
} from "../Actions/adminProductAction.jsx";

export const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    loading: false,
    errors: null,
    Products: [],
    success: false,
    isUpdated: false,
    deleted: false,
    created: false,
  },
  reducers: {
    resetState: (state) => {
      state.deleted = false;
      state.created = false;
      state.errors = null;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProducts.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      return {
        ...state,
        errors: null,
        loading: false,
        Products: action.payload.products,
      };
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(createProduct.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      (state.errors = null),
        (state.loading = false),
        (state.success = true),
        (state.created = true);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(deleteProduct.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      (state.errors = null),
        (state.loading = false),
        (state.success = true),
        (state.deleted = true);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(updatedProduct.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(updatedProduct.fulfilled, (state) => {
      (state.errors = null), (state.loading = false), (state.isUpdated = true);
    });
    builder.addCase(updatedProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
  },
});

export const { resetState } = adminProductSlice.actions;

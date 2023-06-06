import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  fetchProducts,
  getProductDetails,
} from "../Actions/productAction.jsx";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    errors: null,
    productCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        errors: null,
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
      };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
  },
});

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: [],
    loading: false,
    errors: null,
    reviewed: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      return {
        ...state,
        product: action.payload.product,
        errors: null,
        loading: false,
      };
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(addReview.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      return {
        ...state,
        reviewed: action.payload.success,
        errors: null,
        loading: false,
      };
    });
    builder.addCase(addReview.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
  },
});

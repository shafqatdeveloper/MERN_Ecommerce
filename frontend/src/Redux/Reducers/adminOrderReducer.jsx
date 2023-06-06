import { createSlice } from "@reduxjs/toolkit";
import {
  adminOrderDetails,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "../Actions/adminOrderAction.jsx";

export const adminOrdersSlice = createSlice({
  name: "getAllOrdersSlice",
  initialState: {
    orders: [],
    errors: null,
    loading: false,
    order: {},
    deleted: false,
    updated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      console.log("Orders", action.payload.orders);
      return {
        ...state,
        orders: action.payload.orders,
        loading: false,
        errors: null,
      };
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(adminOrderDetails.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(adminOrderDetails.fulfilled, (state, action) => {
      return {
        ...state,
        order: action.payload.order,
        loading: false,
        errors: null,
      };
    });
    builder.addCase(adminOrderDetails.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(deleteOrder.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      return {
        ...state,
        deleted: action.payload.success,
        loading: false,
        errors: null,
      };
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
    builder.addCase(updateOrder.pending, (state) => {
      (state.loading = true), (state.errors = null);
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      return {
        ...state,
        updated: action.payload.success,
        loading: false,
        errors: null,
      };
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.error.message,
      };
    });
  },
});

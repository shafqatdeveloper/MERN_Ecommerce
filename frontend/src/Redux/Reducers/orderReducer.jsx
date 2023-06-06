import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  loggedInUserOrders,
  orderDetails,
} from "../Actions/orderAction.jsx";

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    order: {},
    orders: {},
    singleOrder: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });
    builder.addCase(loggedInUserOrders.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(loggedInUserOrders.fulfilled, (state, action) => {
      (state.loading = false),
        (state.error = null),
        (state.orders = action.payload.orders);
    });
    builder.addCase(loggedInUserOrders.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(orderDetails.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(orderDetails.fulfilled, (state, action) => {
      (state.loading = false),
        (state.error = null),
        (state.singleOrder = action.payload.order);
    });
    builder.addCase(orderDetails.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
  },
});

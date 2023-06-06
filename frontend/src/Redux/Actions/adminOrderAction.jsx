import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/order/admin";
export const getAllOrders = createAsyncThunk("data/getAllOrders", async () => {
  const response = await axios.get(`${url}/allOrders`, {
    withCredentials: true,
  });
  return response.data;
});

export const deleteOrder = createAsyncThunk("data/deleteOrder", async (id) => {
  const response = await axios.delete(`${url}/deleteOrder/${id}`, {
    withCredentials: true,
  });
  return response.data;
});

export const adminOrderDetails = createAsyncThunk(
  "data/admionOrderDetails",
  async (id) => {
    const response = await axios.get(`${url}/orderDetails/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const updateOrder = createAsyncThunk(
  "data/updateOrder",
  async ({ id, updatedStatus }) => {
    const response = await axios.put(
      `${url}/updateOrder/${id}`,
      { updatedStatus: updatedStatus },
      { withCredentials: true }
    );
    return response.data;
  }
);

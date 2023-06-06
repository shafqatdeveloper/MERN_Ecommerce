import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/order";

const config = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};
export const createOrder = createAsyncThunk(
  "data/createOrder",
  async (Order) => {
    const response = await axios.post(`${url}/create`, Order, config);
    return response.data;
  }
);

export const loggedInUserOrders = createAsyncThunk(
  "data/loggedInUserOrders",
  async () => {
    const response = await axios.get(`${url}/me`, { withCredentials: true });
    return response.data;
  }
);

export const orderDetails = createAsyncThunk(
  "data/orderDetails",
  async (id) => {
    const response = await axios.get(`${url}/single/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

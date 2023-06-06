import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/products/admin";
export const getAdminProducts = createAsyncThunk(
  "data/getAdminProducts",
  async () => {
    const response = await axios.get(`${url}/allProducts`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "data/createProduct",
  async ({ myForm }) => {
    console.log(myForm);
    const response = await axios.post(`${url}/create`, myForm, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "data/deleteProduct",
  async (id) => {
    const response = await axios.delete(`${url}/delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const updatedProduct = createAsyncThunk(
  "data/updateProduct",
  async ({ id, myForm }) => {
    const response = await axios.put(`${url}/update/${id}`, myForm, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

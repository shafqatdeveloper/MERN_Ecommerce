import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/user/admin";

export const getAllUsers = createAsyncThunk("data/getAllUsers", async () => {
  const response = await axios.get(`${url}/all`, { withCredentials: true });
  return response.data;
});
export const deleteUser = createAsyncThunk("data/deleteUser", async (id) => {
  const response = await axios.delete(`${url}/deleteUser/${id}`, {
    withCredentials: true,
  });
  return response.data;
});

export const updateUserRole = createAsyncThunk(
  "data/updateUserRole",
  async ({ id, newRole }) => {
    const response = await axios.put(
      `${url}/update/role/${id}`,
      { newRole },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getSingleUser = createAsyncThunk(
  "data/getSingleUser",
  async (id) => {
    const response = await axios.get(`${url}/single/details/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

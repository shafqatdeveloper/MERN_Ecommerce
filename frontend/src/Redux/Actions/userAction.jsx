import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:4000/user";

const config = {
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
};
export const registerUser = createAsyncThunk(
  "data/registerUser",
  async (FormData) => {
    console.log(FormData);
    const response = await axios.post(`${url}/register`, FormData, config);

    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "data/updateUserProfile",
  async (myForm) => {
    const response = await axios.put(`${url}/update`, myForm, config);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "data/loginUser",
  async ({ email, password }) => {
    const response = await axios.post(
      `${url}/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  }
);
export const loadUser = createAsyncThunk("data/loadUser", async () => {
  const response = await axios.get(`${url}/details`, { withCredentials: true });
  return response.data;
});

export const logoutUser = createAsyncThunk("data/logoutUser", async () => {
  const response = await axios.get(`${url}/logout`, { withCredentials: true });
  return response.data;
});

export const updatePassword = createAsyncThunk(
  "data/updatePassword",
  async ({ oldPassword, newPassword, confirmPassword }) => {
    const response = await axios.put(
      `${url}/password/update`,
      { oldPassword, newPassword, confirmPassword },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "data/forgotPassword",
  async ({ email }) => {
    const response = await axios.post(
      `${url}/password/forgot`,
      { email },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "data/resetPassword",
  async ({ token, password, confirmPassword }) => {
    const response = await axios.put(
      `${url}/password/reset/${token}`,
      { password, confirmPassword },
      { withCredentials: true }
    );
    return response.data;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/products";
export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async ({
    query = "",
    category = "",
    price = [0, 300000],
    ratings,
    currentPage = 1,
  }) => {
    let url = `http://localhost:4000/products/all?search=${query}&price_gte=${price[0]}&price_lte=${price[1]}&ratings=${ratings}&currentPage=${currentPage}`;
    if (category) {
      url = `http://localhost:4000/products/all?search=${query}&category=${category}&price_gte=${price[0]}&price_lte=${price[1]}&ratings=${ratings}&currentPage=${currentPage}`;
    }
    const resp = await axios.get(url);
    return resp.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "data/getProductDetails",
  async (id) => {
    const response = await axios.get(`${url}/details/${id}`);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  "data/addReview",
  async ({ productId, rating, comment, name }) => {
    console.log(productId);
    console.log(name);
    const response = await axios.post(
      `${url}/create/review`,
      { productId, rating, comment, name },
      { withCredentials: true }
    );
    return response.data;
  }
);

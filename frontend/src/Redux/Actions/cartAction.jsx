import axios from "axios";

export const addToCart = (quantity, id) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:4000/products/details/${id}`
  );
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      stock: data.product.stock,
      image: data.product.images[0].url,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: "SAVE_SHIPPING_INFO", payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART",
    payload: {},
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

import { combineReducers } from "@reduxjs/toolkit";
import { productDetailsSlice, productsSlice } from "./productReducer.jsx";
import { userSlice } from "./userReducer.jsx";
import { cartReducer } from "./cartReducers.jsx";
import { orderReducer } from "./orderReducer.jsx";
import { adminProductSlice } from "./adminProductReducer.jsx";
import { adminOrdersSlice } from "./adminOrderReducer.jsx";
import { adminUsersSlice } from "./adminUsersReducer.jsx";

export const rootReducer = combineReducers({
  products: productsSlice.reducer,
  product: productDetailsSlice.reducer,
  user: userSlice.reducer,
  cart: cartReducer,
  order: orderReducer.reducer,
  adminProducts: adminProductSlice.reducer,
  adminOrders: adminOrdersSlice.reducer,
  adminUsers: adminUsersSlice.reducer,
});

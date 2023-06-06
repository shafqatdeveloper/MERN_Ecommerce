import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./Redux/Actions/productAction.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/ProductDetails.jsx";
import Navbar from "./Components/Navbar.jsx";
import LoginSignUp from "./Pages/LoginSignUp.jsx";
import { loadUser } from "./Redux/Actions/userAction.jsx";
import Account from "./Pages/Account.jsx";
import UpdatePassword from "./Components/updatePassword.jsx";
import Cart from "./Pages/Cart.jsx";
import Shipping from "./Pages/Shipping.jsx";
import ConfirmOrder from "./Pages/ConfirmOrder.jsx";
import PaymentForm from "./Pages/Payment.jsx";
import OrderSuccess from "./Components/OrderSuccess.jsx";
import MyOrders from "./Pages/MyOrders.jsx";
import OrderDetails from "./Pages/OrderDetails.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import ProductList from "./Pages/Admin/ProductList.jsx";
import CreateProduct from "./Pages/Admin/CreateProduct.jsx";
import UpdateProduct from "./Pages/Admin/UpdateProduct.jsx";
import OrdersList from "./Pages/Admin/OrdersList.jsx";
import AdminOrderDetails from "./Pages/Admin/AdminOrderDetails.jsx";
import UsersList from "./Pages/Admin/UsersList.jsx";
import UpdateRole from "./Pages/Admin/UpdateRole.jsx";
import UpdateUser from "./Components/UpdateUser.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProducts({ query: "", category: "", stars: "", currentPage: 1 })
    );
    dispatch(loadUser());
  }, [dispatch]);
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/loginsignup" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/user/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/account"
          element={
            isAuthenticated ? <Account /> : <Navigate to="/loginsignup" />
          }
        />
        <Route
          path="/password/update"
          element={
            isAuthenticated ? (
              <UpdatePassword />
            ) : (
              <Navigate to="/loginsignup" />
            )
          }
        />
        <Route
          path="/shipping"
          element={
            isAuthenticated ? <Shipping /> : <Navigate to="/loginsignup" />
          }
        />
        <Route
          path="/payment/success"
          element={
            isAuthenticated ? <OrderSuccess /> : <Navigate to="/loginsignup" />
          }
        />
        <Route
          path="/order/confirm"
          element={
            isAuthenticated ? <ConfirmOrder /> : <Navigate to="/loginsignup" />
          }
        />
        <Route
          path="/order/me"
          element={
            isAuthenticated ? <MyOrders /> : <Navigate to="/loginsignup" />
          }
        />
        <Route
          path="/order/:id"
          element={
            isAuthenticated ? <OrderDetails /> : <Navigate to="/loginsignup" />
          }
        />
        <Route
          path="/updateProfile"
          element={
            isAuthenticated ? <UpdateUser /> : <Navigate to="/loginsignup" />
          }
        />

        <Route
          exact
          path="/payment/process"
          element={
            isAuthenticated ? <PaymentForm /> : <Navigate to="loginsignup" />
          }
        />
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/dashboard" element={<Dashboard />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route exact path="/admin/products" element={<ProductList />} />
        )}
        {user.role === "admin" && (
          <Route
            exact
            path="/admin/product"
            element={
              isAuthenticated ? (
                <CreateProduct />
              ) : (
                <Navigate to="/loginsignup" />
              )
            }
          />
        )}
        {user.role === "admin" && (
          <Route
            exact
            path="/admin/product/update/:id"
            element={
              isAuthenticated ? (
                <UpdateProduct />
              ) : (
                <Navigate to="/loginsignup" />
              )
            }
          />
        )}
        {user.role === "admin" && (
          <Route
            exact
            path="/admin/orders"
            element={
              isAuthenticated ? <OrdersList /> : <Navigate to="/loginsignup" />
            }
          />
        )}
        {user.role === "admin" && (
          <Route
            exact
            path="/admin/orderDetails/:id"
            element={
              isAuthenticated ? (
                <AdminOrderDetails />
              ) : (
                <Navigate to="/loginsignup" />
              )
            }
          />
        )}
        {user.role === "admin" && (
          <Route
            exact
            path="/admin/users"
            element={
              isAuthenticated ? <UsersList /> : <Navigate to="/loginsignup" />
            }
          />
        )}
        {user.role === "admin" && (
          <Route
            exact
            path="/admin/single/:id"
            element={
              isAuthenticated ? <UpdateRole /> : <Navigate to="/loginsignup" />
            }
          />
        )}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;

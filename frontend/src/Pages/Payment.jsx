import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { createOrder } from "../Redux/Actions/orderAction.jsx";
import { clearCart } from "../Redux/Actions/cartAction.jsx";

const Payment = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const order = JSON.parse(sessionStorage.getItem("confirmOrder"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  console.log(shippingInfo);
  console.log(cartItems);
  const Order = {
    shippingInfo,
    orderItem: cartItems,
    itemPrice: order.subtotal,
    taxPrice: order.tax,
    shippingPrice: order.shipping,
    totalPrice: order.totalPrice,
  };
  const publishableKey =
    "pk_test_51MK4wxLWegxgVZbebCPJ0K1mNcUemzsKVHP9BCVleRF9QpY6Wd9a25m5BFWQnLuK2UWO8UO3IGv2izCwp4GGghO700RWbN8Kjj";
  const payNow = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/payment/process",
        {
          amount: order.totalPrice * 100,
          token,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        Order.paymentInfo = {
          id: response.data.paymentId,
          status: response.data.paymentStatus,
        };
        dispatch(createOrder(Order));
        dispatch(clearCart());
        naviagte("/payment/success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex items-center justify-center h-[80vh]">
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        shippingAddress
        billingAddress
        amount={order.totalPrice * 100}
        token={payNow}
      />
    </div>
  );
};

export default Payment;

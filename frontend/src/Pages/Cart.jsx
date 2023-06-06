import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../Components/CartItem.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const checkoutHandler = (e) => {
    e.preventDefault();
    navigate("/shipping");
  };
  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full flex flex-col items-center h-full ">
          <div className="w-full pl-5 flex items-center justify-center">
            <h1 className="w-2/4 text-lg font-semibold pl-4 py-3">Items</h1>
            <h1 className="w-1/4 text-lg font-semibold pl-4 py-3">Quantity</h1>
            <h1 className="w-1/4 text-lg font-semibold py-3">Total</h1>
          </div>
          <div className="w-full flex flex-col gap-2 px-5">
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
          <div className="flex bg-sky-400 p-2 mt-7 items-center">
            <h1 className="text-lg  font-semibold">Sub-Total : </h1>
            <span className="pl-1 text-lg">
              PKR{" "}
              {cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}{" "}
            </span>
          </div>
          <div className="pt-5">
            <button
              onClick={checkoutHandler}
              className="bg-orange-500 px-10 rounded-md py-2 font-bold text-white"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-2 flex-col items-center justify-center mt-20">
          <h1>Your Cart is Empty</h1>
          <Link to="/">
            <button className="flex items-center gap-1 bg-gradient-to-r from-[#116aaf] text-white px-1 py-2 rounded-md to-[#111cdf] ">
              <AiOutlineArrowLeft />
              <h1>Continue Shopping</h1>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;

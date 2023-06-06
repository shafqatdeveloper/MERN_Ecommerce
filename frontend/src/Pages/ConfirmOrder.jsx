import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutStep from "../Components/CheckoutStep.jsx";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 2000;
  const tax = Math.ceil(subtotal * 0.18);
  const totalPrice = subtotal + shipping + tax;
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country},`;
  const data = {
    shipping,
    tax,
    totalPrice,
    address,
    subtotal,
  };
  const confirmOrderHandler = (e) => {
    e.preventDefault();
    navigate("/payment/process");
    sessionStorage.setItem("confirmOrder", JSON.stringify(data));
  };
  return (
    <div className="w-full h-full px-20">
      <CheckoutStep activeStep={1} />
      <div className="flex">
        <div className="w-[70%]">
          <div className="py-4 ">
            <h1 className="text-xl font-bold">Shipping Info</h1>
          </div>
          <div>
            <h1>
              Name : <span> {user.name}</span>
            </h1>
          </div>
          <div>
            <h1>
              Phone : <span> {shippingInfo.phone}</span>
            </h1>
          </div>
          <div>
            <h1>
              Adress : <span> {address}</span>
            </h1>
          </div>

          <div className="pt-4 flex flex-col gap-10 w-[60%]">
            <h1 className="text-xl font-bold">Your Cart Items</h1>
            {cartItems &&
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 justify-between"
                >
                  <div className="flex items-center" key={index}>
                    <img src={item.image} alt="" className="w-16 h-16" />
                    <Link className="pl-5" to={`/details/${item.product}`}>
                      {item.name}
                    </Link>
                  </div>
                  <h1>
                    {item.quantity} X{" "}
                    <span className="font-bold pr-0.5">PKR</span>
                    {item.price} :{" "}
                    <span className="font-bold">
                      PKR {item.quantity * item.price}
                    </span>
                  </h1>
                </div>
              ))}
          </div>
        </div>
        <div className="border-l-2 border-gray-500 px-3 w-[30%] flex flex-col items-center justify-center">
          <div className="w-full">
            <div className="w-full text-center">
              <h1 className="text-xl border-b-2 py-3 border-gray-500 w-full ">
                Order Summary
              </h1>
              <div className="flex flex-col border-b-2 border-gray-500 gap-3 py-3">
                <div className="flex items-center justify-between px-3">
                  <h1 className="font-semibold">Subtotal</h1>
                  <span>
                    <span className="font-bold pr-0.5">PKR</span>
                    {subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3">
                  <h1 className="font-semibold">Shipping Charges</h1>
                  <span>
                    <span className="font-bold pr-0.5">PKR</span>
                    {shipping}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3">
                  <h1 className="font-semibold">GST</h1>
                  <span>
                    <span className="font-bold pr-0.5">PKR</span>
                    {tax}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center py-3 justify-between px-3">
              <h1 className="font-bold">Total : </h1>
              <span className="font-semibold">
                <span className="font-bold pr-0.5">PKR</span> {totalPrice}
              </span>
            </div>
            <div className="flex items-center mt-5 justify-center">
              <button
                onClick={confirmOrderHandler}
                className="bg-red-500 px-3 text-white py-2"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

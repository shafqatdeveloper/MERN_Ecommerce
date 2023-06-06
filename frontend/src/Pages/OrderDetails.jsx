import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetails } from "../Redux/Actions/orderAction.jsx";

const OrderDetails = () => {
  const { id } = useParams();
  const { singleOrder } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch]);

  const fullAdress =
    singleOrder && singleOrder.shippingInfo
      ? `${singleOrder.shippingInfo.address || ""}, ${
          singleOrder.shippingInfo.city || ""
        }, ${singleOrder.shippingInfo.state || ""}, ${
          singleOrder.shippingInfo.pinCode || ""
        }, ${singleOrder.shippingInfo.country || ""}`
      : "";

  return (
    <div className="w-full h-full">
      <div className="w-full px-5">
        <h1 className="py-4 text-2xl font-semibold">Shipping Info</h1>
        {singleOrder && singleOrder.user && singleOrder.shippingInfo && (
          <>
            <h1 className="font-semibold">
              Name : <span className="font-thin">{singleOrder.user.name}</span>{" "}
            </h1>
            <h1 className="font-semibold">
              Phone :{" "}
              <span className="font-thin">
                {singleOrder.shippingInfo.phone}
              </span>{" "}
            </h1>
            <h1 className="font-semibold">
              Address : <span className="font-thin">{fullAdress}</span>{" "}
            </h1>
          </>
        )}
      </div>
      <div className="w-full px-5 pt-5">
        <h1 className="text-2xl font-semibold pb-5">Payment</h1>
        <h1 className="font-medium">
          {singleOrder &&
          singleOrder.paymentInfo &&
          singleOrder.paymentInfo.status === "succeeded"
            ? "PAID"
            : "Pending"}
        </h1>
        <h1 className="font-semibold">
          {" "}
          Amount :{" "}
          <span className="font-thin">
            {singleOrder && singleOrder.totalPrice}
          </span>
        </h1>
      </div>
      <div className="w-full px-5 pt-5">
        <h1 className="text-2xl font-semibold pb-5">Order Status</h1>
        <h1 className="font-medium">
          {singleOrder && singleOrder.orderStatus}
        </h1>
      </div>
      <div className="border-t-[1px]  w-full border-gray-400 pt-5 mt-5">
        <h1 className="pb-5 pl-7 text-2xl font-semibold">Order Items :</h1>
        <div className="flex flex-col gap-10">
          {singleOrder &&
            singleOrder.orderItem &&
            singleOrder.orderItem.map((item, index) => (
              <div
                key={index}
                className="flex w-[60%]  justify-between px-7 items-center"
              >
                <div className="flex items-center gap-3">
                  <img src={item.image} alt="" className="w-24 h-24" />
                  <Link
                    className="text-lg font-medium"
                    to={`/details/${item.product}`}
                  >
                    {item.name}
                  </Link>
                </div>
                <h1>
                  {item.price} X {item.quantity} :{" "}
                  <span className="font-semibold text-gray-600 text-lg">
                    {item.price * item.quantity}
                  </span>
                </h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

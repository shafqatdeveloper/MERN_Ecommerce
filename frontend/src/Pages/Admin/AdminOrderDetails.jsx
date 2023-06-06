import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  adminOrderDetails,
  updateOrder,
} from "../../Redux/Actions/adminOrderAction.jsx";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, loading, updated } = useSelector((state) => ({
    ...state.adminOrders,
    updated: state.adminOrders.updated,
  }));
  const { id } = useParams();
  const [updatedStatus, setUpdatedStatus] = useState("");
  useEffect(() => {
    dispatch(adminOrderDetails(id));
  }, [id, dispatch, updated]);
  const updateOrderHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder({ id, updatedStatus }));
    if (updated === true) {
      navigate("/admin/orders");
    }
  };
  let address;
  if (order && order.shippingInfo) {
    address = `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country},`;
  }
  console.log(order.orderItem);

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <div className="flex pl-5">
          <div className="w-full">
            <div className="py-4 ">
              <h1 className="text-xl font-bold">Shipping Info</h1>
            </div>
            <div>
              <h1>
                Name :{" "}
                <span> {order && order.user ? order.user.name : ""}</span>
              </h1>
            </div>
            <div>
              <h1>
                Phone :{" "}
                <span>
                  {" "}
                  {order && order.shippingInfo ? order.shippingInfo.phone : ""}
                </span>
              </h1>
            </div>
            <div>
              <h1>
                Adress : <span> {address}</span>
              </h1>
            </div>
            <div className="py-4">
              <h1 className="text-xl py-1 font-bold">Payment Status</h1>
              {order && order.paymentInfo ? (
                <h1
                  className={
                    order.paymentInfo.status === "succeeded"
                      ? "text-green-600 text-lg font-medium"
                      : "text-red-50 text-lg font-medium"
                  }
                >
                  {order.paymentInfo.status === "succeeded"
                    ? "Paid"
                    : "Pending"}
                </h1>
              ) : (
                ""
              )}
              {order && order.totalPrice ? (
                <h1 className="py-1">
                  <span className="text-lg font-medium">Total Amount : </span>{" "}
                  {order.totalPrice}
                </h1>
              ) : (
                ""
              )}
            </div>
            <div className="py-4">
              <h1 className="text-xl font-bold">Order Status</h1>
              {order && order.orderStatus ? <h1>{order.orderStatus}</h1> : ""}
            </div>
            <div className="pt-4 flex flex-col gap-10 w-[60%]">
              <h1 className="text-xl font-bold">Order Items</h1>
              {order.orderItem &&
                order.orderItem.map((item, index) => (
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
          <div className="w-[28rem] flex items-center flex-col h-[26rem]  mr-3  bg-white-400 shadow-xl shadow-black/50">
            <h1 className="text-2xl font-semibold pt-10">Update Order</h1>
            <div className="w-full h-full flex items-center justify-center ">
              <form className="flex w-2/4 gap-20 flex-col">
                <select
                  className="outline-none focus:outline-none border-2 p-2 border-gray-700"
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  name="status"
                >
                  <option
                    className="bg-teal-600 text-lg py-2"
                    value={updatedStatus}
                  >
                    Processing
                  </option>
                  <option className="bg-teal-600 text-lg py-2" value="shipped">
                    Shipped
                  </option>
                  <option
                    className="bg-teal-600 text-lg py-2"
                    value="delivered"
                  >
                    Delivered
                  </option>
                </select>
                <button
                  onClick={updateOrderHandler}
                  disabled={
                    loading
                      ? true
                      : false || updatedStatus === ""
                      ? true
                      : false
                  }
                  className="bg-orange-500 text-white px-5 py-1"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

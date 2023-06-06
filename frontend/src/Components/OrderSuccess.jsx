import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <div className="flex w-full h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <CheckCircleIcon style={{ fontSize: 74, color: "#FF5F1F" }} />
        <h1 className="text-lg font-semibold text-gray-800 pb-3">
          Your Order Has been Placed Successfully
        </h1>
        <Link to="/order/me">
          <button className="px-8 py-2 bg-gray-800 hover:bg-gray-600 text-white">
            My Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

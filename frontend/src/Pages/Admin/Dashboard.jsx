import React, { useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../Redux/Actions/adminProductAction.jsx";
import { allUsers } from "../../Redux/Actions/userAction.jsx";
import { getAllOrders } from "../../Redux/Actions/adminOrderAction.jsx";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { Products } = useSelector((state) => state.adminProducts);
  const { Users } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.adminOrders);
  useEffect(() => {
    dispatch(getAdminProducts());
  }, []);
  useEffect(() => {
    dispatch(allUsers());
    dispatch(getAllOrders());
  }, []);

  let outOfStock = 0;
  if (Products && Array.isArray(Products)) {
    Products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  }
  let totalAmount = 0;
  if (Products && Array.isArray(Products)) {
    Products.forEach((item) => {
      totalAmount += item.price;
    });
  }
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const dougnatState = {
    labels: ["outOfStock", "InStock"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#ff5271", "#ff9266"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [Products ? Products.length - outOfStock : 0, outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <span>343</span>
            </p>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{Products ? Products.length : 0}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length > 0 ? orders.length : "0"}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{Users && Users.length > 0 ? Users.length : "0"}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={dougnatState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

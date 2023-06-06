import React, { useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../Redux/Actions/adminProductAction.jsx";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { Products } = useSelector((state) => state.adminProducts);
  useEffect(() => {
    dispatch(getAdminProducts());
  });

  let outOfStock = 0;
  if (Products && Array.isArray(Products)) {
    Products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  }
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
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
                <p>23</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>78</p>
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

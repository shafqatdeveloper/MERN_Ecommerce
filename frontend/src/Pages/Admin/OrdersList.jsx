import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
import { Typography } from "@mui/material";
import "../../Components/MyOrder.css";
import {
  getAllOrders,
  deleteOrder,
} from "../../Redux/Actions/adminOrderAction.jsx";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, deleted } = useSelector((state) => state.adminOrders);
  console.log(orders);
  useEffect(() => {
    dispatch(getAllOrders());
    if (deleted) {
      navigate("/dashoboard");
    }
  }, [dispatch]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 130, flex: 0.5 },
    {
      field: "quantity",
      type: "number",
      headerName: "Quantity",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "status",
      type: "number",

      headerName: "Order Status",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "price",
      type: "number",

      headerName: "Total Price",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 130,
      flex: 0.5,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <>
            <Link
              className="mr-3"
              to={`/admin/orderDetails/${params.getValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link>
            <button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];
  const rows = [];
  if (orders && Array.isArray(orders)) {
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        quantity: item.orderItem.length,
        status: item.orderStatus,
        price: item.totalPrice,
      });
    });
  }

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Orders List</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          myOrdersTable
        />
      </div>
    </div>
  );
};

export default OrdersList;

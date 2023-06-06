import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Components/MyOrder.css";
import { useDispatch, useSelector } from "react-redux";
import LaunchIcon from "@mui/icons-material/Launch";
import { loggedInUserOrders } from "../Redux/Actions/orderAction.jsx";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loggedInUserOrders());
  }, [dispatch]);
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  console.log(orders);
  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 250, flex: 1 },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQnty",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      minWidth: 150,
      type: "number",
      headerName: "Actions",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  if (orders && Array.isArray(orders)) {
    orders.forEach((item, index) => {
      rows.push({
        itemsQnty: item.orderItem.length,
        amount: item.totalPrice,
        id: item._id,
        status: item.orderStatus,
      });
    });
  }
  return (
    <div className="w-full h-[80vh] p-2">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        className="myOrdersTable"
      />
      <div className="w-full text-center bg-gray-700 font-semibold rounded-md text-gray-200 py-2 mt-3 text-lg">
        <h1>{user.name}'s Orders</h1>
      </div>
    </div>
  );
};

export default MyOrders;

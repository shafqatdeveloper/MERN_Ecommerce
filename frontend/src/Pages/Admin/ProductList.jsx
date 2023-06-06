import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
import { Typography } from "@mui/material";
import "../../Components/MyOrder.css";
import {
  deleteProduct,
  getAdminProducts,
} from "../../Redux/Actions/adminProductAction.jsx";
import { resetState } from "../../Redux/Reducers/adminProductReducer.jsx";

const ProductList = () => {
  const dispatch = useDispatch();
  const { Products, deleted } = useSelector((state) => state.adminProducts);
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch, deleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(resetState());
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 160, flex: 0.4 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 100,
      type: "number",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
      type: "number",
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      type: "number",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/product/update/${params.getValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link>
            <button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
              className="ml-3"
            >
              <DeleteIcon />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  if (Products && Array.isArray(Products)) {
    Products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });
  }

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Products List</Typography>
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

export default ProductList;

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
  deleteUser,
  getAllUsers,
} from "../../Redux/Actions/adminUsersAction.jsx";
import { resetState } from "../../Redux/Reducers/adminUsersReducer.jsx";

const UsersList = () => {
  const { users, deleted } = useSelector((state) => state.adminUsers);
  const { user } = useSelector((state) => state.user);
  console.log(user._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers());
    if (deleted) {
      navigate("/admin/users");
      dispatch(resetState());
    }
  }, [deleted, dispatch]);
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 120, flex: 0.2 },
    { field: "name", headerName: "User Name", minWidth: 120, flex: 0.3 },
    { field: "email", headerName: "User Email", minWidth: 130, flex: 0.4 },
    { field: "role", headerName: "User Role", minWidth: 50, flex: 0.2 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 130,
      flex: 0.4,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/single/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <button
              disabled={
                params.getValue(params.id, "id").toString() ===
                user._id.toString()
                  ? true
                  : false || params.getValue(params.id, "role") === "admin"
              }
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
              className="ml-4"
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];
  const rows = [];
  if (users && Array.isArray(users)) {
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
    });
  }
  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Users List</Typography>
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

export default UsersList;

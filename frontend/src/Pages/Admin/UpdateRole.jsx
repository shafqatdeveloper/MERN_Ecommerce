import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleUser,
  updateUserRole,
} from "../../Redux/Actions/adminUsersAction.jsx";
import { resetState } from "../../Redux/Reducers/adminUsersReducer.jsx";

const UpdateRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, updated } = useSelector((state) => state.adminUsers);
  const [newRole, setNewRole] = useState("");
  useEffect(() => {
    dispatch(getSingleUser(id));
    if (updated) {
      navigate("/admin/users");
      dispatch(resetState());
    }
  }, [id, dispatch, updated]);
  console.log(user);
  const updateRoleHandler = (e) => {
    e.preventDefault();
    console.log(newRole);
    dispatch(updateUserRole({ id, newRole }));
  };
  console.log(user.role);
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-2/4 flex-col flex items-center justify-center">
        <img
          src={user.avatar?.url || profile}
          alt=""
          className="w-52 object-cover h-52 rounded-full"
        />
        <div
          className={
            user && user.role === "admin"
              ? "hidden"
              : "w-[28rem] flex items-center flex-col h-full  mr-3  bg-white-400 shadow-xl shadow-black/50"
          }
        >
          <h1 className="text-2xl font-semibold pt-10">Update User Role</h1>
          <div className="w-full h-full flex items-center justify-center ">
            <form className="flex pt-5 w-2/4 gap-10 flex-col">
              <label className="flex items-center gap-4">
                <input
                  type="radio"
                  disabled={user && user.role === "admin" ? true : false}
                  name="role"
                  value="admin"
                  checked={newRole === "admin"}
                  onChange={(e) => setNewRole(e.target.value)}
                />
                Admin
              </label>
              <button
                onClick={updateRoleHandler}
                className="bg-orange-500 mb-4 text-white px-5 py-1"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-2/4 flex flex-col ">
        <h1 className="text-2xl font-bold pb-3">User's Info</h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Name</h1>
          <h1 className="uppercase text-gray-600">
            {user && user.name ? user.name : ""}
          </h1>
        </div>
        <div className="flex py-5 flex-col gap-1">
          <h1 className="text-lg font-semibold">Email</h1>
          <h1 className="uppercase text-gray-600">
            {user && user.email ? user.email : ""}
          </h1>
        </div>
        <div className="flex  flex-col gap-1">
          <h1 className="text-lg font-semibold">Role</h1>
          <h1 className="uppercase text-gray-600">
            {user && user.role ? user.role : ""}
          </h1>
        </div>
        <div className="flex pt-5 flex-col gap-1">
          <h1 className="text-lg font-semibold">Created At</h1>
          <h1 className="uppercase text-gray-600">
            {String(user && user.createdAt ? user.createdAt : "").substring(
              0,
              10
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UpdateRole;

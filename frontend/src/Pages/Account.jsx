import React from "react";
import profile from "../assets/profile.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-2/4 flex-col flex items-center justify-center">
        <img
          src={user.avatar?.url || profile}
          alt=""
          className="w-52 object-cover h-52 rounded-full"
        />
        <Link to="/updateProfile">
          <button className="bg-sky-600 hover:bg-sky-400 px-3 py-2 mt-2">
            Update Profile
          </button>
        </Link>
      </div>
      <div className="w-2/4 flex flex-col ">
        <h1 className="text-2xl font-bold pb-3">Personal Info</h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Name</h1>
          <h1 className="uppercase text-gray-600">{user.name}</h1>
        </div>
        <div className="flex py-5 flex-col gap-1">
          <h1 className="text-lg font-semibold">Email</h1>
          <h1 className="uppercase text-gray-600">{user.email}</h1>
        </div>
        <div className="flex  flex-col gap-1">
          <h1 className="text-lg font-semibold">Role</h1>
          <h1 className="uppercase text-gray-600">{user.role}</h1>
        </div>
        <div className="flex pt-5 flex-col gap-1">
          <h1 className="text-lg font-semibold">Created At</h1>
          <h1 className="uppercase text-gray-600">
            {String(user.createdAt).substring(0, 10)}
          </h1>
        </div>
        <div className="flex pt-5 gap-2">
          <Link to="/password/update">
            <button className="bg-orange-500 w-36 py-1.5 text-white hover:bg-yellow-400">
              Update Password
            </button>
          </Link>
          <Link to="/order/me">
            <button className="bg-orange-500 w-36 py-1.5 text-white hover:bg-yellow-400">
              My Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;

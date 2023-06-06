import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../Redux/Actions/userAction.jsx";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const hanldePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <form
        onSubmit={hanldePasswordSubmit}
        className="bg-sky-500 items-center flex flex-col gap-5 w-[30%] p-4 rounded-md"
      >
        <input
          type="password"
          name="password"
          placeholder="Enter Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border-2 py-2 text-center w-full border-gray-600 rounded-md outline-none focus:outline-none"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-2 py-2 text-center w-full border-gray-600 rounded-md outline-none focus:outline-none"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-2 py-2 text-center w-full border-gray-600 rounded-md outline-none focus:outline-none"
        />
        <button
          type="submit"
          className="bg-orange-500 w-[70%] rounded-md py-1.5 text-white hover:bg-yellow-400"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;

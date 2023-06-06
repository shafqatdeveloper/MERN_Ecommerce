import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../Redux/Actions/userAction.jsx";
import { useNavigate } from "react-router-dom";
import { resetState } from "../Redux/Reducers/userReducer.jsx";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updated, user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });
  useEffect(() => {
    if (updated) {
      navigate("/account");
      dispatch(resetState());
    }
  }, [updated, dispatch]);
  const [avatar, setAvatar] = useState("");
  const handleUpdateData = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const { name, email } = userData;

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUserProfile(myForm));
  };

  return (
    <div className="w-full flex h-[80vh] items-center justify-center">
      <form
        onSubmit={handleUpdateSubmit}
        className="w-2/5 bg-sky-500 py-5 flex flex-col items-center gap-8 relative mt-3 px-3"
      >
        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="text"
            value={name}
            onChange={handleUpdateData}
            name="name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="w-full">
          <input
            value={email}
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="email"
            onChange={handleUpdateData}
            name="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="file"
            id="file"
            onChange={handleUpdateData}
            name="avatar"
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 mt-5 text-white font-semibold w-48 py-2"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;

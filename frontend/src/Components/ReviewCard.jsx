import React from "react";
import profilePng from "../assets/profile.jpg";
import { Rating } from "@mui/material";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  console.log(review);
  return (
    <div className="w-[33%] flex-none ml-2 md:ml-5 border-2 h-64 my-4">
      <div className="w-full  pt-4  flex flex-col items-center ">
        <img src={profilePng} alt="" className="w-14 rounded-full h-14 " />
        <h1 className="py-1">{review.name}</h1>
        <Rating {...options} />
        <h1 className="pt-2">{review.comment}</h1>
      </div>
    </div>
  );
};

export default ReviewCard;

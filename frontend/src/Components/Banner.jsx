import React from "react";
import Carasoul from "react-material-ui-carousel";
import Banner1 from "./Banner1.jsx";

const Banner = () => {
  return (
    <div className="w-full h-screen">
      <div className="md:flex hidden items-center">
        <Banner1 />
      </div>
    </div>
  );
};

export default Banner;

import React, { useRef } from "react";
import Products from "../Components/Products";
import Sponsors from "./Sponsors.jsx";

const Hero = () => {
  const productRef = useRef();
  return (
    <>
      <div className="w-full flex items-center justify-center text-[#fff] bg-[#165D7D] h-[88vh]">
        <div className="w-[40%] flex flex-col gap-8">
          <h1 className="text-6xl">Raining Offers For Hot Summer!</h1>
          <h1 className="text-lg tracking-normal">25% Off On All Products</h1>
          <button
            onClick={() =>
              productRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-gray-700 w-32 font-semibold py-2.5"
          >
            Shop Now
          </button>
        </div>
      </div>
      <div ref={productRef}>
        <Products />
      </div>
      <div>
        <Sponsors />
      </div>
    </>
  );
};

export default Hero;

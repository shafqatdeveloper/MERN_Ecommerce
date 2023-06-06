import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaYahoo,
  FaYoutube,
  FaTwitter,
  FaMicrosoft,
} from "react-icons/fa";

const Sponsors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      icon: FaFacebook,
    },
    {
      icon: FaInstagram,
    },
    {
      icon: FaTwitter,
    },
    {
      icon: FaYoutube,
    },
    {
      icon: FaMicrosoft,
    },
    {
      icon: FaYahoo,
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const visibleItems = items.slice(currentIndex, currentIndex + 5);
  const mobileVisibleItems = items.slice(currentIndex, currentIndex + 3);
  const showPrevArrow = currentIndex > 0;
  const showNextArrow = currentIndex + 5 < items.length;
  const showMobileNextArrow = currentIndex + 3 < items.length;

  return (
    <div className="w-full h-full flex items-center justify-center my-7">
      <div className="md:flex relative transition-all duration-500 items-center hidden bg-slate-500 w-3/4 py-3.5 px-10 rounded-md justify-between">
        {showPrevArrow && (
          <AiOutlineArrowLeft
            onClick={handlePrevious}
            className="absolute left-2 cursor-pointer bg-white rounded-md"
            size={24}
          />
        )}
        {showNextArrow && (
          <AiOutlineArrowRight
            onClick={handleNext}
            className="absolute right-2 cursor-pointer bg-white rounded-md"
            size={24}
          />
        )}
        {visibleItems.map((item, index) => {
          const Icon = item.icon;
          return <Icon key={index} size={70} />;
        })}
      </div>
      <div className="flex relative items-center  md:hidden bg-slate-500 w-[97%] sm:w-[80%] py-2 px-7 rounded-md justify-between">
        {showPrevArrow && (
          <AiOutlineArrowLeft
            onClick={handlePrevious}
            className="absolute left-1 bg-white rounded-full"
            size={20}
          />
        )}
        {showMobileNextArrow && (
          <AiOutlineArrowRight
            onClick={handleNext}
            className="absolute right-1 bg-white rounded-full"
            size={20}
          />
        )}
        {mobileVisibleItems.map((item, index) => {
          const Icon = item.icon;
          return <Icon key={index} size={70} />;
        })}
      </div>
    </div>
  );
};

export default Sponsors;

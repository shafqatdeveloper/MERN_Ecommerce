import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader.jsx";
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { Rating } from "@material-ui/lab";
import { Slider } from "@mui/material";
import { fetchProducts } from "../Redux/Actions/productAction.jsx";
import { BsSearch } from "react-icons/bs";

const Products = () => {
  const options = {
    readOnly: true,
    precision: 0.5,
  };
  const [whiteList, setWhiteList] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 300000]);
  const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ category, price, ratings, query }));
  }, [category, price, ratings, query]);

  const { products, loading } = useSelector((state) => state.products);
  const whiteListhandler = () => {
    setWhiteList(!whiteList);
    if (!whiteList) {
      toast("Added to WhiteList", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Removed from WhiteList", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    console.log(price);
  };
  const ratingHandler = (e, newRating) => {
    setRatings(newRating);
  };

  const hanldeSearch = (e) => {
    setQuery(e.target.value).toString();
  };

  return (
    <>
      <div className="w-full flex h-full">
        <div className="w-[210px] border-r-2 border-b-2 border-gray-400 h-full">
          <div className="w-full px-2">
            <h1 className="pt-5 pl-2">Search Products</h1>
            <div className="flex items-center border-2 border-gray-700 mt-1.5 rounded-md ">
              <input
                value={query}
                onChange={hanldeSearch}
                type="text"
                className="bg-transparent w-full outline-none focus:outline-none "
              />
              <BsSearch size={15} className="cursor-pointer mr-1 h-full" />
            </div>
          </div>
          <h1 className="pt-5  pl-2">Filter By Category</h1>
          <div className="w-full px-2 pt-1.5">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" outline-none focus:outline-none w-full border-2 border-orange-500 rounded-md px-2"
            >
              <option value="">Select Category</option>
              <option value="Phone">Phone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Ipad">Ipad</option>
            </select>
          </div>
          <h1 className="pt-5 pl-2">Filter By Price</h1>
          <div className="w=full px-4 pt-1.5">
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={300000}
            />
          </div>
          <h1 className="pt-5 pl-2">Filter by Ratings</h1>
          <div className="w=full pt-1.5 px-4">
            <Slider
              value={ratings}
              onChange={ratingHandler}
              valueLabelDisplay="auto"
              aria-labelledby="auto"
              min={0}
              max={5}
            />
          </div>
        </div>
        <div className="grid px-3  mt-2 pt-5 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {products &&
            products.map((item) => (
              <div
                key={item._id}
                className="border-2 border-gray-300 p-2 rounded-md"
              >
                <Link to={`/details/${item._id}`}>
                  <img
                    src={item.images[0]?.url || profile}
                    alt="Pic"
                    className="w-full h-64 sm:h-52 rounded-md"
                  />
                </Link>
                <div className="pl-1 flex flex-col gap-1">
                  <h1 className="uppercase text-gray-500 pt-2">
                    {item.category}
                  </h1>
                  <h1 className="font-semibold">{item.name}</h1>
                  <Rating {...options} value={item.ratings} />
                  <div className="flex justify-between items-center">
                    <h1>
                      PKR <span className="font-bold">{item.price}</span>
                    </h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;

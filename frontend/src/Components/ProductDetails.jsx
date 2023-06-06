import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addReview,
  getProductDetails,
} from "../Redux/Actions/productAction.jsx";
import Carasoul from "react-material-ui-carousel";
import Loader from "./Loader.jsx";
import "../App.css";
import { addToCart } from "../Redux/Actions/cartAction.jsx";
import ReviewCard from "./ReviewCard.jsx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.product);
  const { reviewed } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, reviewed]);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const inceraseQuantity = () => {
    if (quantity >= product.stock) {
      return;
    } else {
      const newQnty = quantity + 1;
      setQuantity(newQnty);
    }
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    } else {
      const newQnty = quantity - 1;
      setQuantity(newQnty);
    }
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(quantity, product._id));
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(addReview({ productId: id, rating, comment, name: user.name }));
    setOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full sm:h-[80vh]">
          <div className="w-full pt-5 sm:pt-0 h-full flex flex-col sm:flex-row items-center">
            <div className=" w-full sm:w-[50%]">
              <Carasoul>
                {product.images &&
                  product.images.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <img src={item.url} alt="Pic" className="w-96 h-96 " />
                    </div>
                  ))}
              </Carasoul>
            </div>
            <div className="w-full sm:w-[50%] ">
              <div className="flex sm:block flex-col px-4 sm:px-0 items-center justify-center">
                <h1 className="font-semibold text-lg">{product.name}</h1>
                <h1 className="py-3">{product.desc}</h1>
                <div className="flex gap-2 items-center">
                  <Rating {...options} value={product.ratings} />
                  <h1 className="flex font-bold items-center">
                    {product.numOfReviews}{" "}
                  </h1>
                  {product.numOfReviews <= 1 ? (
                    <h2 className="pl-0.5"> Review</h2>
                  ) : (
                    <h2 className="pl-0.5"> Reviews</h2>
                  )}
                </div>
                <div className="flex py-2 items-center">
                  <h1 className="font-bold">Stock : </h1>
                  {product.stock < 1 ? (
                    <h1 className="text-red-600 pl-1 font-semibold">
                      Out Of Stock
                    </h1>
                  ) : (
                    <h1 className="text-green-500 pl-1 font-semibold">
                      In Stock
                    </h1>
                  )}
                </div>
                <div className="flex my-2 bg-sky-600 text-white  w-min items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-black/60 px-3 h-full py-1.5 "
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="border-none bg-transparent px-4 w-14 text-center outline-none"
                  />
                  <button
                    className="bg-black/60 px-3 h-full py-1.5 "
                    onClick={inceraseQuantity}
                  >
                    +
                  </button>
                </div>
                <div className="py-4">
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="bg-sky-700 w-48 py-2 font-semibold text-white"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="py-4">
                  <button
                    onClick={submitReviewToggle}
                    className="bg-orange-500 w-48 py-2 font-semibold text-white"
                  >
                    Submit A Review
                  </button>
                  <Dialog
                    aria-aria-labelledby="simple-dialog-title "
                    open={open}
                    onClose={submitReviewToggle}
                  >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="flex flex-col gap-3">
                      <Rating
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        size="large"
                      />
                      <textarea
                        value={comment}
                        className="border-2 border-sky-500 outline-none focus:outline-none"
                        onChange={(e) => setComment(e.target.value)}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                      </Button>
                      <Button onClick={submitReviewHandler} color="primary">
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews[0] ? (
            <div className="flex review overflow-auto my-10">
              {product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          ) : (
            <h1 className="text-xl font-bold pt-8">No Reviews Yet</h1>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;

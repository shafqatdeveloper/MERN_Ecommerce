import React from "react";
import { addToCart, removeFromCart } from "../Redux/Actions/cartAction.jsx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const inceraseQuantity = (quantity, id, stock) => {
    if (quantity >= stock) {
      return;
    } else {
      const newQnty = quantity + 1;
      dispatch(addToCart(newQnty, id));
    }
  };
  const decreaseQuantity = (quantity, id) => {
    if (1 >= quantity) {
      return;
    }
    const newQnty = quantity - 1;
    dispatch(addToCart(newQnty, id));
  };

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full border-2 border-orange-300 justify-center flex items-center">
        <div className="w-2/4 flex p-5 items-center gap-3">
          <img src={item.image} alt="" className="w-16 h-16" />
          <div>
            <Link to={`/details/${item.product}`}>
              <h1 className="font-sans text-lg border-b-2 border-orange-200">
                {item.name}
              </h1>
            </Link>
            <button
              onClick={() => removeCartHandler(item.product)}
              className="text-center pl-10 text-red-600 pt-2"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex my-2 bg-sky-600 text-white  w-min items-center">
            <button
              onClick={() => decreaseQuantity(item.quantity, item.product)}
              className="bg-black/60 px-3 h-full py-1.5 "
            >
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              readOnly
              className="border-none bg-transparent px-4 w-14 text-center outline-none"
            />
            <button
              className="bg-black/60 px-3 h-full py-1.5 "
              onClick={() =>
                inceraseQuantity(item.quantity, item.product, item.stock)
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/4">
          <h1 className="pl-3 font-medium">
            <span className="font-mono">PKR</span> {item.price * item.quantity}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

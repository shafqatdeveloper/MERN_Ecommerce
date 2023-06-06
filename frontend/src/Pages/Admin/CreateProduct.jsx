import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
import "./Dashboard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/Actions/adminProductAction.jsx";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../Redux/Reducers/adminProductReducer.jsx";

const CreateProduct = () => {
  const { created, errors } = useSelector((state) => state.adminProducts);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (errors) {
      toast(errors, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetState());
    }
    if (created) {
      toast("Product Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/dashboard");
      dispatch(resetState());
    }
  });
  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("desc", desc);
    images.map((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct({ myForm }));
  };

  const priceHandler = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <h1 className="text-center text-2xl textgra font-medium pt-10">
          Create Product
        </h1>
        <div className="w-full flex items-center justify-center">
          <form
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              className="border-2 py-2 rounded-md px-2 w-96 border-orange-600 outline-none focus:outline-none"
              required
              name="name"
              value={name}
              placeholder="Enter Name of The Product"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              placeholder="Enter Price of The Product"
              name="price"
              type="number"
              className="border-2 py-2 rounded-md px-2 w-96 border-orange-600 outline-none focus:outline-none"
              value={price}
              onChange={priceHandler}
            />
            <textarea
              required
              placeholder="Enter Description of The Product"
              name="desc"
              type="text"
              className="border-2 py-2 rounded-md px-2 w-96 border-orange-600 outline-none focus:outline-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <select
              className="border-2 py-2 rounded-md px-2 w-96 border-orange-600 outline-none focus:outline-none"
              placeholder="Select Category of The Product"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Phone">Phone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Ipad">Ipad</option>
            </select>
            <input
              required
              placeholder="Specify Stock of The Product"
              name="stock"
              type="number"
              className="border-2 py-2 rounded-md px-2 w-96 border-orange-600 outline-none focus:outline-none"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <input
              onChange={createProductImageChange}
              type="file"
              name="images"
              required
              accept="image/*"
              multiple
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-2 font-medium"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

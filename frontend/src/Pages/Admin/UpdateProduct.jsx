import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar.jsx";
import "./Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updatedProduct,
} from "../../Redux/Actions/adminProductAction.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../Redux/Actions/productAction.jsx";
import { resetState } from "../../Redux/Reducers/adminProductReducer.jsx";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { isUpdated, errors } = useSelector((state) => state.adminProducts);
  const { product } = useSelector((state) => state.product);
  const { id } = useParams();
  console.log(product);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [desc, setDesc] = useState(product.desc);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [images, setImages] = useState([]);
  console.log(images);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isUpdated) {
      navigate("/dashboard");
    }
  });
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
    if (isUpdated) {
      toast("Product Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/admin/products");
      dispatch(resetState());
    }
  });
  const updateProductImageChange = (e) => {
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
  const updateProductSubmitHandler = (e) => {
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
    dispatch(updatedProduct({ id, myForm }));
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboardContainer">
        <h1 className="text-center text-2xl textgra font-medium pt-10">
          Update Product
        </h1>
        <div className="w-full flex items-center justify-center">
          <form
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
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
              onChange={(e) => setPrice(e.target.value)}
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
              onChange={updateProductImageChange}
              type="file"
              name="images"
              accept="image/*"
              multiple
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-2 font-medium"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

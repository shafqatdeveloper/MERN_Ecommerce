import Product from "../Models/productModel.js";
import cloudinary from "cloudinary";

// Create A Product --Admin
export const createProduct = async (req, res) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "avatars",
      });

      imagesLinks.push({
        public_id: await result.public_id,
        url: await result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.toString(),
    });
  }
};

// Update Product --Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "avatars",
      });

      imagesLinks.push({
        public_id: await result.public_id,
        url: await result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: `Product Updated with ID ${req.params.id}`,
      updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.toString(),
    });
  }
};

// Delete Product --Admin

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await Product.deleteOne(product);
    res.status(200).json({
      success: true,
      message: `Product Deleted with ID ${req.params.id}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products --Admin

export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productCount = await Product.countDocuments();
    res.status(200).json({
      success: true,
      products,
      productCount,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Products

export const getAllProducts = async (req, res) => {
  const resultPerPage = 8;
  const Pagination = {
    limit: resultPerPage,
    skip: (req.query.page - 1) * resultPerPage,
  };
  const query = buildQuery(
    req.query.search,
    req.query.category,
    [req.query.price_gte, req.query.price_lte],
    req.query.ratings
  );
  console.log(query);
  try {
    const products = await Product.find(query, {}, Pagination);
    const productsCount = await Product.countDocuments();
    res.status(200).json({
      success: true,
      products,
      resultPerPage,
      productsCount,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const buildQuery = (search, category, price, ratings) => {
  let query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { desc: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }
  if (category) {
    query.category = {
      $regex: category,
      $options: "i",
    };
  }
  if (price && price.length === 2) {
    console.log("Price Length", true);
    query.price = {
      $gte: price[0],
      $lte: price[1],
    };
  }
  if (ratings) {
    query.ratings = {
      $gte: ratings,
    };
  }
  return query;
};

// Get Details of A Single Product
export const productDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Create or Update Review

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, name } = req.body;
    const review = {
      user: req.user.id,
      comment,
      rating: Number(rating),
      name,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString()) {
          (rev.comment = comment), (rev.rating = rating);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => (avg += rev.rating));
    product.ratings = avg / product.reviews.length;
    await product.save();
    res.status(200).json({
      success: true,
      message: "Review Added",
      product,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reviews

export const getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(
      (rev) => rev.id.toString() !== req.query.productId.toString()
    );
    let avg = 0;
    const ratings = product.reviews.forEach((rev) => (avg += rev.rating));
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, ratings, numOfReviews },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      message: "Review Deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

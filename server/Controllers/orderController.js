import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";

// Create an Order

export const createOrder = async (req, res) => {
  const {
    shippingInfo,
    orderItem,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log(req.user.id);
  try {
    const order = await Order.create({
      shippingInfo,
      orderItem,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user.id,
      paidAt: Date.now(),
    });
    res.status(200).json({
      success: true,
      message: "Order Created",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order By ID

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders of Logged In User

export const loggedInUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order --Admin

export const updateOrder = async (req, res) => {
  try {
    const { updatedStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === "delivered") {
      res.status(400).json({
        success: false,
        message: "You have Already Delivered this order",
      });
    } else {
      if (updatedStatus === "delivered") {
        order.orderItem.forEach(async (item) => {
          await updateStock(item.product, item.quantity);
        });
        await Order.findByIdAndUpdate(
          req.params.id,
          { $set: { orderStatus: updatedStatus } },
          { runValidators: false }
        );
        res.status(200).json({
          success: true,
          message: "Order Status Updated",
        });
      } else {
        await Order.findByIdAndUpdate(
          req.params.id,
          { $set: { orderStatus: updatedStatus } },
          { runValidators: false }
        );
        res.status(200).json({
          success: true,
          message: "Order Status Updated",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    await Order.deleteOne(order);
    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

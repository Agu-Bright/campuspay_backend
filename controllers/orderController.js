const Order = require("../model/orderModel");
const Books = require("../model/bookModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const updateStock = async (id, quantity) => {
  const book = await Books.findById(id);
  book.stock = book.stock - quantity;
  await book.save({ validateBeforeSave: false });
};

//create new order => api/v1/order/new
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get single order => api/v1/order/:id
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user orders => api/v1/order/:id
const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Admin get all orders => api/v1/admin/orders
const allOrders = catchAsyncErrors(async (req, res, next) => {
  let orders;
  if (req.user.role === "seller") {
    //get orders to the books created by the seller
  }
  orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.itemsPrice));
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Admin update, process order => api/v1/admin/order/:id
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This Order is Alresdy Delivered", 400));
  }
  //update the book stock
  order.orderItems.forEach(async (item) => {
    await updateStock(item.book, item.quantity);
  });
  //update the order status
  order.orderStatus = status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

//Admin delete order => api/v1/order/:id
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
};

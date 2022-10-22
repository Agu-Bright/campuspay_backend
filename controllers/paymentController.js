const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const paystack = require("paystack")(
  "sk_test_bc0f2149e76178f972b96a50610d08e3e8650fd8"
);

//initialize paysack payment => /api/v1/payment/process
exports.initializeTransaction = catchAsyncErrors(async (req, res, next) => {
  const info = await paystack.transaction.initialize({
    key: "pk_test_5d67915325c90b410bc427c84496492dcde14f08",
    email: req.body.email,
    amount: req.body.amount * 100,
    phone: req.body.phone,
    currency: "NGN",
    metadata: {
      userId: req.user.id,
      itemPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
    },
    //callback_url: `http://localhost:5000/payment/verify`,
    callback_url: `${req.protocol}://${req.get("host")}/payment/verify`,
  });
  res.status(200).json({
    ...info,
  });
});

//verify Transaction => http://localhost:5000/payment/verify?trxref="referenceNumber"&reference="ReferenceNumber"
exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {
  const info = await paystack.transaction.verify(req.query.trxref);
  res.status(200).json({
    ...info.data,
  });
});

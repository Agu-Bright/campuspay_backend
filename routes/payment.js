const express = require("express");
const router = express.Router();
const {
  initializeTransaction,
  verifyPayment,
} = require("../controllers/paymentController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/payment/process", authMiddleware, initializeTransaction);

router.get("/payment/verify", authMiddleware, verifyPayment);
module.exports = router;

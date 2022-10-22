const express = require("express");
const router = express.Router();
const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
  sellerOrders,
} = require("../controllers/orderController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post("/order/new", authMiddleware, newOrder);
router.get("/order/:id", authMiddleware, getSingleOrder);
router.get("/orders/me", authMiddleware, myOrders);
router.get("/orders/seller", authMiddleware, sellerOrders);

router.get(
  "/admin/orders",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  allOrders
);

router.put(
  "/admin/order/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateOrder
);

router.delete(
  "/admin/order/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteOrder
);
module.exports = router;

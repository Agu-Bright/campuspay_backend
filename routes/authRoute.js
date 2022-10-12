const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserDetails,
  logoutUser,
  getUsers,
  adminGetUserDetail,
  adminUpdateUserDetails,
  deleteUser,
  sellerRequest,
  getSellers,
} = require("../controllers/authController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgotPassword", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/me", authMiddleware, getUserDetails);
router.put("/password/update", authMiddleware, updatePassword);
router.put("/me/update", authMiddleware, updateUserDetails);
router.put("/me/seller", authMiddleware, authorizeRoles("user"), sellerRequest);

//admin routes
router.get("/admin/users", authMiddleware, authorizeRoles("admin"), getUsers);
router.get(
  "/admin/sellers",
  authMiddleware,
  authorizeRoles("admin"),
  getSellers
);
router.get(
  "/admin/user/:id",
  authMiddleware,
  authorizeRoles("admin"),
  adminGetUserDetail
);
router.put(
  "/admin/user/:id",
  authMiddleware,
  authorizeRoles("admin"),
  adminUpdateUserDetails
);

router.delete(
  "/admin/user/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser
);

router.get("/logout", logoutUser);
module.exports = router;

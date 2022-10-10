const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getNewBooks,
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  deleteReview,
  createUpdateBookReview,
  getBookReviews,
  AdminGetAllBooks,
} = require("../controllers/booksController");

router.post(
  "/admin/createBook",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  createBook
);

router.delete(
  "/admin/book/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  deleteBook
);

router.put(
  "/admin/book/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  updateBook
);

router.get(
  "/admin/books",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  AdminGetAllBooks
);

router.get("/books", getAllBooks);
router.get("/newBooks", getNewBooks);
router.get("/book/:id", getBook);

router.put("/review", authMiddleware, createUpdateBookReview);
router.get("/reviews", getBookReviews);
router.delete("/review", authMiddleware, deleteReview);

//seller get all books that are approved
//seller get all books that are pending
//seller get all books that are rejected

module.exports = router;

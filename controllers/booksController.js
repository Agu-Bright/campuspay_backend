const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Books = require("../model/bookModel");
const ApiFeatures = require("../middlewares/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
//create book POST ==> /api/v1/create_book/
const createBook = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "books",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  let status = "pending";
  if (req.user.role === "admin") {
    status = "approved";
  }
  const book = {
    ...req.body,
    images: imagesLinks,
    user: req.user._id,
    status: status,
  };
  const Book = await Books.create(book);
  res.status(201).json({
    success: true,
    Book,
  });
});

//get All books =>  /api/v1/books?search=Phsycology&price[gte]=2000&page=1
const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const resperpage = 8;
  const booksCount = await Books.countDocuments({ status: "approved" });
  const apiFeatures = new ApiFeatures(
    Books.find({ status: "approved" }),
    req.query
  )
    .search()
    .filter();

  apiFeatures.paginate(resperpage);
  let books = await apiFeatures.query;
  let filteredBookCount = books.length;
  const numberOfPages = Math.ceil(booksCount / resperpage);
  const searchNumberOfPages = Math.ceil(filteredBookCount / resperpage);
  res.status(200).json({
    success: true,
    books,
    booksCount,
    filteredBookCount,
    resperpage,
    numberOfPages,
    searchNumberOfPages,
  });
});
//get All books =>  /api/v1/admin/books
const AdminGetAllBooks = catchAsyncErrors(async (req, res, next) => {
  const role = req.user.role;
  let books;
  if (role === "seller") {
    books = await Books.find({ user: req.user._id });
  } else {
    books = await Books.find();
  }

  res.status(200).json({
    success: true,
    books,
  });
});

const getNewBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Books.find({ status: "approved" });
  const latestBooks = books.slice(-8);
  res.status(200).json({ success: true, latestBooks });
});

//get Single book ==> /api/v1/book/:id
const getBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const book = await Books.findById(id);
  // if (!book || book.status !== "approved") {
  //   return next(new ErrorHandler("No Book Found", 404));
  // }
  res.status(200).json({
    success: true,
    book,
  });
});

//updateBooks  => /api/v1/admin/book/:id PATCH
const updateBook = catchAsyncErrors(async (req, res, next) => {
  //here you dont want the seller to be able to update his book to approved

  const { id } = req.params;
  const sellersBook = await Books.findById(id);
  if (
    req.user._id.toString() === sellersBook.user.toString() ||
    req.user.role === "admin"
  ) {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      //deleting image from the cloudinary
      for (let i = 0; i < sellersBook.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          sellersBook.images[i].public_id
        );
      }

      let imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "books",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      const book = {
        ...req.body,
        images: imagesLinks,
        user: req.user._id,
      };

      req.body = book;
    }

    //we will have to prevent the seller from updating his book through this endpoint, this is a vulnerability, will be taken care of soon
    const update = await Books.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: true,
    });

    return res.status(200).json({ success: true, update });
  } else {
    return next(new ErrorHandler("internal server error", 500));
  }
});

//deleteBook /api/v1/admin/book/:id DELETE
const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  //the user should be able to delete the book, if he is the creator ar he is the admin
  const sellersBook = await Books.findById(id);
  if (!sellersBook) {
    return next(new ErrorHandler("product not found", 404));
  }

  if (
    req.user._id.toString() === sellersBook.user.toString() ||
    req.user.role === "admin"
  ) {
    await Books.findByIdAndRemove(id);
    //deleting image from the cloudinary
    for (let i = 0; i < sellersBook.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        sellersBook.images[i].public_id
      );
    }
    return res.status(200).json({ success: true });
  } else {
    return next(new ErrorHandler("internal server error", 500));
  }
});

//create / update book review => /api/v1/review
const createUpdateBookReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, bookId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const book = await Books.findById(bookId);
  //check is book is already reviewed by the current user
  const isReviewed = book.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //update the review
    book.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    //not reviewed, add a new review
    book.reviews.push(review);
    book.numberOfReviews = book.reviews.length;
  }

  //calculate the overall rating
  book.rating =
    book.reviews.reduce((acc, item) => {
      return item.rating + acc;
    }, 0) / book.reviews.length;

  await book.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get product reviews => api/v1/reviews
const getBookReviews = catchAsyncErrors(async (req, res, next) => {
  const book = await Books.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: book.reviews,
  });
});

//delete review => api/v1/review?id=01209320934&bookId=9034290982432309
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const book = await Books.findById(req.query.bookId);
  /**id: This is the id of the review you want to delete, bookId: This is the id of the book you want to delete its review */
  //filter out the review
  const reviews = book.reviews
    .filter((review) => review._id.toString() !== req.query.id)
    .toString();

  //get number of reviews
  const numberOfReviews = reviews.length;

  //calculate the current rating
  const rating =
    book.reviews.reduce((acc, item) => {
      return item.rating + acc;
    }, 0) / reviews.length;

  //update the book

  await Books.findByIdAndUpdate(
    req.query.bookId,
    {
      reviews,
      rating,
      numberOfReviews,
    },
    {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true });
});

module.exports = {
  getAllBooks,
  getNewBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  deleteReview,
  createUpdateBookReview,
  getBookReviews,
  deleteReview,
  AdminGetAllBooks,
};

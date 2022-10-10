import {
  ALL_BOOKS_REQUEST,
  ALL_BOOKS_SUCCESS,
  ALL_BOOKS_FAIL,
  CREATE_BOOKS_REQUEST,
  CREATE_BOOKS_SUCCESS,
  CREATE_BOOKS_FAIL,
  CREATE_BOOKS_RESET,
  ADMIN_GET_BOOKS_REQUEST,
  ADMIN_GET_BOOKS_SUCCESS,
  ADMIN_GET_BOOKS_FAIL,
  NEW_BOOKS_REQUEST,
  NEW_BOOKS_SUCCESS,
  NEW_BOOKS_FAIL,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAIL,
  BOOK_REVIEW_REQUEST,
  BOOK_REVIEW_SUCCESS,
  BOOK_REVIEW_FAIL,
  BOOK_REVIEW_RESET,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  DELETE_BOOKS_REQUEST,
  DELETE_BOOKS_SUCCESS,
  DELETE_BOOKS_FAIL,
  DELETE_BOOKS_RESET,
  UPDATE_BOOKS_REQUEST,
  UPDATE_BOOKS_SUCCESS,
  UPDATE_BOOKS_FAIL,
  UPDATE_BOOKS_RESET,
  CLEAR_ERRORS,
} from "../constants/bookConstants";

export const bookReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case ALL_BOOKS_REQUEST:
    case ADMIN_GET_BOOKS_REQUEST:
      return {
        loading: true,
        books: [],
      };
    case ALL_BOOKS_SUCCESS:
      return {
        loading: false,
        books: action.payload.books,
        booksCount: action.payload.booksCount,
        resPerPage: action.payload.resperpage,
        filteredBookCount: action.payload.filteredBookCount,
        numberOfPages: action.payload.numberOfPages,
        searchNumberOfPages: action.payload.searchNumberOfPages,
      };
    case ADMIN_GET_BOOKS_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case ALL_BOOKS_FAIL:
    case ADMIN_GET_BOOKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newBookReducer = (state = { newBooks: [] }, action) => {
  switch (action.type) {
    case NEW_BOOKS_REQUEST:
      return {
        loading: true,
        newBooks: [],
      };
    case NEW_BOOKS_SUCCESS:
      return {
        loading: false,
        newBooks: action.payload.latestBooks,
      };
    case NEW_BOOKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bookDetailsReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case GET_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOOK_SUCCESS:
      return {
        loading: false,
        book: action.payload,
      };
    case GET_BOOK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bookReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_REVIEW_REQUEST:
      return {
        ...state,
        sending: true,
        success: false,
      };
    case BOOK_REVIEW_SUCCESS:
      return {
        sending: false,
        success: action.payload,
      };
    case BOOK_REVIEW_FAIL:
      return {
        sending: false,
        error: action.payload,
      };
    case BOOK_REVIEW_RESET:
      return {
        ...state,
        sending: false,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getBookReviewReducer = (state = { reviews: null }, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case GET_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case GET_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createBookReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case CREATE_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BOOKS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        book: action.payload.book,
      };
    case CREATE_BOOKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_BOOKS_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const deleteBookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOKS_REQUEST:
    case UPDATE_BOOKS_REQUEST:
      return {
        ...state,
        deleting: true,
        reset: false,
      };
    case DELETE_BOOKS_SUCCESS:
      return {
        ...state,
        deleting: false,
        isDeleted: action.payload,
      };

    case UPDATE_BOOKS_SUCCESS:
      return {
        ...state,
        deleting: false,
        isUpdated: action.payload,
      };
    case DELETE_BOOKS_FAIL:
    case UPDATE_BOOKS_FAIL:
      return {
        deleting: false,
        error: action.payload,
      };
    case DELETE_BOOKS_RESET:
      return {
        ...state,
        isDeleted: false,
        reset: true,
      };
    case UPDATE_BOOKS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

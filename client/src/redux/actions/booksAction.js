import axios from "axios";

import {
  ALL_BOOKS_REQUEST,
  ALL_BOOKS_SUCCESS,
  ALL_BOOKS_FAIL,
  CREATE_BOOKS_REQUEST,
  CREATE_BOOKS_SUCCESS,
  CREATE_BOOKS_FAIL,
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
  CLEAR_ERRORS,
  DELETE_BOOKS_REQUEST,
  DELETE_BOOKS_SUCCESS,
  DELETE_BOOKS_FAIL,
  DELETE_BOOKS_RESET,
  UPDATE_BOOKS_REQUEST,
  UPDATE_BOOKS_SUCCESS,
  UPDATE_BOOKS_FAIL,
  UPDATE_BOOKS_RESET,
} from "../constants/bookConstants";

export const getBooks = (searchQuery, page, location) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOKS_REQUEST });
    let link = `/api/v1/books?page=${page}&&location=${location}`;
    if (searchQuery) {
      link = `/api/v1/books?search=${searchQuery}&&location=${location}`;
    }
    const { data } = await axios.get(link);
    dispatch({
      type: ALL_BOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BOOKS_FAIL,
      payload: error.message,
    });
  }
};
export const getBooksLocation = (location) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOKS_REQUEST });
    let link = `/api/v1/books?location=${location}`;
    // if (searchQuery) {
    //   link = `/api/v1/books?search=${searchQuery}&&location=${location}`;
    // }
    const { data } = await axios.get(link);
    dispatch({
      type: ALL_BOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BOOKS_FAIL,
      payload: error.message,
    });
  }
};

export const adminGetBooks = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_BOOKS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/books", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: ADMIN_GET_BOOKS_SUCCESS,
      payload: data.books,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_BOOKS_FAIL,
      payload: error.message,
    });
  }
};
export const getNewBooks = () => async (dispatch) => {
  try {
    dispatch({ type: NEW_BOOKS_REQUEST });
    let link = `/api/v1/newBooks`;
    const { data } = await axios.get(link);
    dispatch({
      type: NEW_BOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BOOKS_FAIL,
      payload: error.message,
    });
  }
};

export const getSingleBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BOOK_REQUEST });

    const { data } = await axios.get(`/api/v1/book/${id}`);
    dispatch({
      type: GET_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOK_FAIL,
      payload: error.message,
    });
  }
};

export const postBookReview = (formData) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_REVIEW_REQUEST });
    const { data } = await axios.put(`/api/v1/review`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: BOOK_REVIEW_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: BOOK_REVIEW_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: BOOK_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

export const getBookReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: GET_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

export const createBook = (Data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BOOKS_REQUEST });

    const { data } = await axios.post(`/api/v1/admin/createBook`, Data, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: CREATE_BOOKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKS_FAIL,
      payload: error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/book/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: DELETE_BOOKS_SUCCESS, payload: data.success });

    dispatch({ type: DELETE_BOOKS_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKS_FAIL,
      payload: error.message,
    });
  }
};

export const updateBook = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BOOKS_REQUEST });
    const { data } = await axios.put(`/api/v1/admin/book/${id}`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: UPDATE_BOOKS_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: UPDATE_BOOKS_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKS_FAIL,
      payload: error.message,
    });
  }
};
//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

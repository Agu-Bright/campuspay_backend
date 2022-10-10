import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAIL,
  UPDATE_ORDERS_RESET,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_RESET,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

export const placeOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const { data } = await axios.post("/api/v1/order/new", order, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAIL, payload: error.message });
  }
};

//get currently logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/orders/me", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
  }
};
//Admin get all orders
export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/orders", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const updateOrder = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDERS_REQUEST });
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: UPDATE_ORDERS_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      payload: error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDERS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success });

    dispatch({ type: DELETE_ORDERS_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.message,
    });
  }
};

export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PROFILE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  ALL_SELLERS_REQUEST,
  ALL_SELLERS_SUCCESS,
  ALL_SELLERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  REGISTER_SELLER_REQUEST,
  REGISTER_SELLER_SUCCESS,
  REGISTER_SELLER_FAIL,
  REGISTER_SELLER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstants";
import axios from "axios";

//login
export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post("/api/v1/login", formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post("/api/v1/register", formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.Message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logOut", {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put("/api/v1/me/update", formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put("/api/v1/password/update", passwords, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post("/api/v1/forgotPassword", email, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/users", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

export const allSellers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SELLERS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/sellers", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: ALL_SELLERS_SUCCESS, payload: data.sellers });
  } catch (error) {
    dispatch({ type: ALL_SELLERS_FAIL, payload: error.response.data.message });
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const { data } = await axios.put(`/api/v1/admin/user/${id}`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: UPDATE_USER_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.message,
    });
  }
};
export const registerSeller = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_SELLER_REQUEST });
    const { data } = await axios.put(`/api/v1/me/seller`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: REGISTER_SELLER_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: REGISTER_SELLER_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: REGISTER_SELLER_FAIL,
      payload: error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });

    dispatch({ type: DELETE_USER_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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

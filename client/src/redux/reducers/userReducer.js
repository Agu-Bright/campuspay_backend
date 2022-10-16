import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
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
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  REGISTER_SELLER_REQUEST,
  REGISTER_SELLER_SUCCESS,
  REGISTER_SELLER_FAIL,
  REGISTER_SELLER_RESET,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        logError: action.payload,
      };

    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        regError: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
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

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        updating: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updating: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        state,
      };
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return {
        error: null,
        sending: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        sending: false,
        message: action.payload,
      };
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
        sending: false,
      };
    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        sending: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        state,
      };
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        state,
      };
  }
};
export const allSellersReducer = (state = { sellers: [] }, action) => {
  switch (action.type) {
    case ALL_SELLERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_SELLERS_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: action.payload,
      };

    case ALL_SELLERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        state,
      };
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case REGISTER_SELLER_REQUEST:
      return {
        ...state,
        updating: true,
      };

    case UPDATE_USER_SUCCESS:
    case REGISTER_SELLER_SUCCESS:
      return {
        updating: false,
        isUpdated: action.payload,
      };

    case UPDATE_USER_RESET:
    case REGISTER_SELLER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_USER_FAIL:
    case REGISTER_SELLER_FAIL:
      return {
        updating: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        deleting: true,
        reset: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleting: false,
        isDeleted: action.payload,
      };

    case DELETE_USER_FAIL:
      return {
        deleting: false,
        error: action.payload,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
        reset: true,
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

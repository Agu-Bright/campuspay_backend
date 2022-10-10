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

export const orderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        order: null,
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
        loading: false,
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

export const orderDetailsReducer = (state = { order: null }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        order: null,
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        orders: null,
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
export const updateOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDERS_REQUEST:
      return {
        ...state,
        updating: true,
      };

    case UPDATE_ORDERS_SUCCESS:
      return {
        updating: false,
        isUpdated: action.payload,
      };

    case UPDATE_ORDERS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_ORDERS_FAIL:
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

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDERS_REQUEST:
      return {
        ...state,
        deleting: true,
        reset: false,
      };
    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        deleting: false,
        isDeleted: action.payload,
      };

    case DELETE_ORDERS_FAIL:
      return {
        deleting: false,
        error: action.payload,
      };
    case DELETE_ORDERS_RESET:
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

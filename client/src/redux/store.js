import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  bookReducer,
  bookDetailsReducer,
  newBookReducer,
  bookReviewReducer,
  getBookReviewReducer,
  createBookReducer,
  deleteBookReducer,
} from "./reducers/bookReducer";
import {
  userReducer,
  usersReducer,
  forgotPasswordReducer,
  allUsersReducer,
  deleteUserReducer,
  userDetailsReducer,
  updateUserReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  updateOrdersReducer,
  deleteOrderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  createBook: createBookReducer,
  books: bookReducer,
  newBooks: newBookReducer,
  bookDetails: bookDetailsReducer,
  deleteBook: deleteBookReducer,
  review: bookReviewReducer,
  reviews: getBookReviewReducer,
  auth: userReducer,
  user: usersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  DeleteUser: deleteUserReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  theOrder: orderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: updateOrdersReducer,
  deleteOrder: deleteOrderReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? [...JSON.parse(localStorage.getItem("cartItems"))]
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

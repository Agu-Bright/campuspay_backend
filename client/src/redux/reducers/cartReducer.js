import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        adding: true,
      };
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.book === item.book);
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.book === item.book ? item : i
          ),
          adding: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          adding: false,
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.book !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemAdded = action.payload;
      const ItemExist = state.cartItems.findIndex(
        (EveryAddedItem) => EveryAddedItem.product === itemAdded.product
      );
      if (ItemExist >= 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((everyItem) =>
            everyItem.product === itemAdded.product ? itemAdded : everyItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdded],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

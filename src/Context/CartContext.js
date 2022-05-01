import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (itemId) => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

export const CartContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(cartReducer, defaultCartState);

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const removeFromCartHandler = (itemId) => {
    dispatch({ type: "REMOVE", itemId: itemId });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

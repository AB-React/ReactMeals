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
    let updatedItems;
    let updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    let updatedTotalAmount =
      state.totalAmount - action.item.price * action.item.quantity;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - action.item.quantity,
    };
    if (updatedItem.quantity > 0) {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items].filter((item, index) => {
        return index !== existingCartItemIndex;
      });
    }
    if (updatedItems.length === 0) {
      updatedTotalAmount = 0;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

export const CartContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(cartReducer, defaultCartState);

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const removeFromCartHandler = (item) => {
    dispatch({ type: "REMOVE", item: item });
  };
  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

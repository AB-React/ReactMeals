import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Context/CartContext";

import style from "./Cart.module.sass";

const Cart = (props) => {
  const cartCtx = React.useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const CartItemRemoveHandler = (item) => {
    cartCtx.removeItem({ ...item, quantity: 1 });
  };

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => {
        // return <li key={item.id}>{item.name}</li>;
        return (
          <CartItem
            key={item.id}
            item={item}
            onAdd={CartItemAddHandler.bind(null, item)}
            onRemove={CartItemRemoveHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onDismiss={props.onDismiss}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={props.onDismiss}>
          Close
        </button>
        {hasItems && <button className={style.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

import React from "react";
import Modal from "../UI/Modal";

import style from "./Cart.module.sass";

const Cart = (props) => {
  const cartItems = (
    <ul className={style["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal onDismiss={props.onDismiss}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={props.onDismiss}>
          Close
        </button>
        <button className={style.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

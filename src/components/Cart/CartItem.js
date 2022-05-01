import React from "react";

import style from "./CartItem.module.sass";

const CartItem = (props) => {
  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <li className={style["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={style.summary}>
          <span className={style.price}>{price}</span>
          <span className={style.amount}>x {props.item.quantity}</span>
        </div>
      </div>
      <div className={style.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;

import React from "react";
import CartIcon from "../Cart/CartIcon";
import cartContext from "../../Context/CartContext";

import style from "./HeaderCartButton.module.sass";

const HeaderCartButton = (props) => {
  const CartCtx = React.useContext(cartContext);
  const numberOfCartItems = CartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  return (
    <button className={style.button} onClick={props.onClick}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

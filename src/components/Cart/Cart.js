import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Context/CartContext";
import Checkout from "./Checkout";

import style from "./Cart.module.sass";
import axios from "axios";

const Cart = (props) => {
  const cartCtx = React.useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [didSubmit, setDidSubmit] = React.useState(false);
  const [httpError, setHttpError] = React.useState(null);

  const CartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const CartItemRemoveHandler = (item) => {
    cartCtx.removeItem({ ...item, quantity: 1 });
  };

  const orderButtonClickHandler = (event) => {
    setIsCheckingOut(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    setDidSubmit(false);
    setHttpError(null);

    axios
      .post("https://alybadawy-8b6ed-default-rtdb.firebaseio.com/orders.json", {
        user: userData,
        items: cartCtx.items,
      })
      .then((res) => {
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      })
      .catch((err) => {
        setHttpError(err.message);
      });
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

  const cartModalContent = (
    <>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onDismiss={props.onDismiss} onSubmit={submitOrderHandler} />
      )}
      {!isCheckingOut && (
        <div className={style.actions}>
          <button className={style["button--alt"]} onClick={props.onDismiss}>
            Close
          </button>
          {hasItems && (
            <button className={style.button} onClick={orderButtonClickHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order Data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <button className={style.button} onClick={props.onDismiss}>
        Close
      </button>
    </>
  );

  const errorModalContent = <p>{httpError}</p>;

  return (
    <Modal onDismiss={props.onDismiss}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {httpError && errorModalContent}
    </Modal>
  );
};

export default Cart;

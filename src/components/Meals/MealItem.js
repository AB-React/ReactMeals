import React from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../Context/CartContext";

import style from "./MealItem.module.sass";

const MealItem = (props) => {
  const cartCtx = React.useContext(CartContext);
  const price = `$${props.meal.price.toFixed(2)}`;
  const addToCartHandler = (quantity) => {
    const itemToAddToCart = { ...props.meal, quantity: quantity };
    cartCtx.addItem(itemToAddToCart);
  };

  return (
    <li className={style.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={style.description}>{props.meal.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

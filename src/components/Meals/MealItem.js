import React from "react";
import MealItemForm from "./MealItemForm";

import style from "./MealItem.module.sass";

const MealItem = (props) => {
  const price = `$${props.meal.price.toFixed(2)}`;
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={style.description}>{props.meal.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} />
      </div>
    </li>
  );
};

export default MealItem;

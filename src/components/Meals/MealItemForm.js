import React from "react";
import Input from "../UI/Input";

import style from "./MealItemForm.module.sass";

const MealItemForm = (props) => {
  const quantityInputRef = React.useRef();

  const [isValid, setIsValid] = React.useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = quantityInputRef.current.value;
    const quantityToAdd = +enteredQuantity;
    if (
      enteredQuantity.trim().length === 0 ||
      quantityToAdd < 1 ||
      quantityToAdd > 5
    ) {
      setIsValid(false);
      return;
    }
    props.onAddToCart(quantityToAdd);
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;

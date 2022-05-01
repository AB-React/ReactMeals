import React from "react";
import Input from "../UI/Input";

import style from "./MealItemForm.module.sass";

const MealItemForm = (props) => {
  return (
    <form className={style.form}>
      <Input
        label="Quantity"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;

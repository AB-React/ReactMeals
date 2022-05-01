import React from "react";
import dummyMeals from "./DummyMeals";
import Card from "../UI/Card";
import MealItem from "./MealItem";

import style from "./AvailableMeals.module.sass";

const AvailableMeals = () => {
  const mealsList = dummyMeals.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });
  return (
    <section className={style.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

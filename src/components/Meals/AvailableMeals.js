import React from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import axios from "axios";

import style from "./AvailableMeals.module.sass";

const AvailableMeals = () => {
  const [meals, setMeals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [httpError, setHttpError] = React.useState(null);

  React.useEffect(() => {
    const fetchMeals = () => {
      axios
        .get("https://alybadawy-8b6ed-default-rtdb.firebaseio.com/meals.json")
        .then((res) => {
          const loadedMeals = [];
          for (const mealId in res.data) {
            loadedMeals.push({
              id: mealId,
              name: res.data[mealId].name,
              description: res.data[mealId].description,
              price: res.data[mealId].price,
            });
          }
          setMeals(loadedMeals);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setHttpError(err.message);
        });
    };

    fetchMeals();
  }, []);

  if (!!isLoading) {
    return (
      <section className={style.MealsLoading}>
        <p>Loading</p>
      </section>
    );
  }
  if (!!httpError) {
    return (
      <section className={style.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // When not loading and no httpError
  const mealsList = meals.map((meal) => {
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

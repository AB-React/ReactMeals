import React from "react";
// import dummyMeals from "./DummyMeals";
import Card from "../UI/Card";
import MealItem from "./MealItem";

import style from "./AvailableMeals.module.sass";

const AvailableMeals = () => {
  const [meals, setMeals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [httpError, setHttpError] = React.useState(null);

  React.useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://alybadawy-8b6ed-default-rtdb.firebaseio.com/meals.json"
      );

      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // fetchMeals();

    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
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

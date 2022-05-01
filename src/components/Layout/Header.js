import React from "react";
import headerMEalImage from "../../Assets/meals.jpeg";
import style from "./Header.module.sass";

const Header = (props) => {
  return (
    <>
      <header className={style.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={style["main-image"]}>
        <img src={headerMEalImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;

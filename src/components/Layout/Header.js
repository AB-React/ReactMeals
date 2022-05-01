import React from "react";
import headerMEalImage from "../../Assets/meals.jpeg";
import style from "./Header.module.sass";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={style.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={style["main-image"]}>
        <img src={headerMEalImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;

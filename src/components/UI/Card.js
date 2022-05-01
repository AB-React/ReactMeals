import React from "react";
import style from "./Card.module.sass";

const Card = (props) => {
  return <div className={style.card}>{props.children}</div>;
};

export default Card;

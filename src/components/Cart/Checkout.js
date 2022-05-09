import React from "react";

import style from "./Checkout.module.sass";

const Checkout = (props) => {
  const nameInputRef = React.useRef();
  const streetInputRef = React.useRef();
  const postalInputRef = React.useRef();
  const cityInputRef = React.useRef();

  const [formInputsValidity, setFormInputValidity] = React.useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };
  return (
    <form className={style.form} onSubmit={confirmHandler}>
      <div
        className={`${style.control} ${
          formInputsValidity.name ? "" : style.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div
        className={`${style.control} ${
          formInputsValidity.street ? "" : style.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div
        className={`${style.control} ${
          formInputsValidity.postal ? "" : style.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please Enter a Valid Postal code!</p>}
      </div>
      <div
        className={`${style.control} ${
          formInputsValidity.city ? "" : style.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onDismiss}>
          Cancel
        </button>
        <button className={style.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

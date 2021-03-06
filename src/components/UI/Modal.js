import React from "react";
import ReactDom from "react-dom";

import style from "./Modal.module.sass";

const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onDismiss} />;
};

const ModalOverlay = (props) => {
  return <div className={style.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onDismiss={props.onDismiss} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => (
  <div className={classes.backdrop} onClick={props.onClose}></div>
);

const ModalOverlay = (props) => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
);

const Modal = (props) => {
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(cartActions.hideCart());
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onCloseHandler} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;

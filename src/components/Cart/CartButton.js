import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const clickHandler = () => {
    dispatch(cartActions.showCart());
  };
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;

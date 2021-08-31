import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
// { title: "Test Item", quantity: 3, total: 18, price: 6 }
const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItems = items.map((item) => (
    <CartItem
      item={item}
      key={item.id}
      onAdd={addToCartHandler}
      onRemove={removeItemHandler}
    />
  ));
  return (
    <Modal>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>{cartItems}</ul>
      </Card>
    </Modal>
  );
};

export default Cart;

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { title, quantity, price, id } = props.item;

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${(price * quantity).toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onRemove.bind(null, id)}>-</button>
          <button onClick={props.onAdd.bind(null, props.item)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

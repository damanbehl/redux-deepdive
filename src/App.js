import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

//define it outside of the component func so that this does not change and does not
//re-initialize  if the component renders again this will be initialized when the file is parsed for the first time
//so when the app first started
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // useEffect(() => {
  //   fetchCartData()(dispatch);
  // }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

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
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "DUMMY URL",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalItems: cart.totalItems,
            totalPrice: cart.totalPrice,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart Data failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart.items, cart.totalItems, cart.totalPrice, dispatch]);

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
        <Products items={cart} />
      </Layout>
    </Fragment>
  );
}

export default App;

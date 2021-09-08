import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("DUMMY");
      if (!response.ok) {
        throw new Error("sending cart Data failed");
      }
      const responseData = await response.json();
      return responseData;
    };
    try {
      const cartData = (await fetchData()) || {};
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalItems: cartData.totalItems || 0,
          totalPrice: cartData.totalPrice || 0,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("DUMMY", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalItems: cart.totalItems,
          totalPrice: cart.totalPrice,
        }),
      });
      if (!response.ok) {
        throw new Error("sending cart Data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialCartState = {
  showCart: false,
  items: [],
  totalItems: 0,
  totalPrice: 0,
};
// { title: "Test Item", quantity: 3, total: 18, price: 6 }
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
    addItem(state, action) {
      const incoming = action.payload;
      state.totalPrice += incoming.price;
      state.totalItems += 1;
      const existItemIndex = state.items.findIndex(
        (item) => item.id === incoming.id
      );

      if (existItemIndex !== -1) {
        state.items[existItemIndex].quantity++;
      } else {
        state.items.push({ ...incoming, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.totalItems--;
      const id = action.payload;
      const existItemIndex = state.items.findIndex((item) => item.id === id);

      const existingItem = state.items[existItemIndex];
      state.totalPrice -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items[existItemIndex].quantity--;
      }
    },
  },
});

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

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

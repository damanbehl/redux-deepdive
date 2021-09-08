import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  showCart: false,
  items: [],
  totalItems: 0,
  totalPrice: 0,
  changed: false,
};
// { title: "Test Item", quantity: 3, total: 18, price: 6 }
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalItems = action.payload.totalItems;
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
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
      state.changed = true;
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
      state.changed = true;
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

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { showCart: false, items: [] };

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
    addItem(state, action) {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

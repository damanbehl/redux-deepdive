import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products items={cartItems} />
    </Layout>
  );
}

export default App;

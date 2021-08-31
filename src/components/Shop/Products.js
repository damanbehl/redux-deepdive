import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: "i1",
    name: "sushi",
    price: 4.55,
    description: "Delicious, raw, with exotic saucew",
  },
  {
    id: "i2",
    name: "soup",
    price: 14.55,
    description: "healthy, green, aromatic",
  },
  {
    id: "i3",
    name: "pad thai",
    price: 55.55,
    description:
      "in combination with chicken or beef or bacon, from sweet to extra spicy",
  },
];

const Products = (props) => {
  const productItems = DUMMY_ITEMS.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      title={item.name}
      price={item.price}
      description={item.description}
    />
  ));
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productItems}</ul>
    </section>
  );
};

export default Products;

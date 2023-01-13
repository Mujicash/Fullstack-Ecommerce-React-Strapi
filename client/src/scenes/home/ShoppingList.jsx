import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import Product from "../../components/Product";
import { setProducts } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const products = useSelector((state) => state.cart.products);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  console.log("products", products);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  async function getProducts() {
    const products = await fetch(
      "http://localhost:1337/api/products?populate=*",
      { method: "GET" }
    );

    const productsJson = await products.json();
    dispatch(setProducts(productsJson.data));
  }

  useEffect(() => {
    getProducts();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedProducts = products.filter(
    (product) => product.attributes.category === "topRated"
  );

  const newArrivalsProducts = products.filter(
    (product) => product.attributes.category === "newArrivals"
  );

  const bestSellersProducts = products.filter(
    (product) => product.attributes.category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none"} }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap"
          }
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box 
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" && products.map((product) => (
          <Product product={product} key={`${product.name}-${product.id}`} />
        ))}
        {value === "newArrivals" && newArrivalsProducts.map((product) => (
          <Product product={product} key={`${product.name}-${product.id}`} />
        ))}
        {value === "bestSellers" && bestSellersProducts.map((product) => (
          <Product product={product} key={`${product.name}-${product.id}`} />
        ))}
        {value === "topRated" && topRatedProducts.map((product) => (
          <Product product={product} key={`${product.name}-${product.id}`} />
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
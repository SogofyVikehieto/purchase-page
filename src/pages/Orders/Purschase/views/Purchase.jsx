import { Box, Typography, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFormDetails from "../helpers/useFormDetails";
import useProducts from "../helpers/useProducts";

function Purchase() {
  const { formId } = useParams();
  const {
    formDetails: { distributorid, distributorname, retailername },
    error,
  } = useFormDetails({ formId });
  const {
    products,
    error: productsError,
    updateQuantity,
  } = useProducts({
    distributorId: distributorid,
    categoryId: "0",
    searchText: "ALL",
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [cart, setCart] = useState({ price: 0, items: 0, products: 0 });

  useEffect(() => {
    let price = 0;
    let items = 0;
    let cartProducts = 0;
    products.forEach((product) => {
      price += (product.quantity || 0) * product.price;
      items += product.quantity || 0;
      cartProducts += product.quantity ? 1 : 0;
    });
    setCart({ price: Number(price).toFixed(2), items, products: cartProducts });
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          searchFilter === "" ||
          product.productname.toLowerCase().includes(searchFilter.toLowerCase())
      ),
    [products, searchFilter]
  );

  return (
    <Container>
      <Box>
        <Typography variant="h4">Purchase Order</Typography>
      </Box>
      <Box>
        <Typography>{error}</Typography>
        <Typography>{productsError}</Typography>
        <Typography variant="body1">Supplier: {distributorname}</Typography>
        <Typography variant="body1">Retailer: {retailername}</Typography>
        <Typography>Items: {cart.items}</Typography>
        <Typography>Products: {cart.products}</Typography>
        <Typography variant="body2">Rs. {cart.price}</Typography>
      </Box>
      <Box>
        <TextField
          style={{ width: "100%", mb: 2, textAlign: "center" }}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          variant="filled"
          label="Search Products"
        />
      </Box>
      <Box>
        {filteredProducts.map((product, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              marginBottom: "10px",
              borderBottom: "1px solid #1b5ae3",
            }}
          >
            <Box>
              <Typography sx={{ textAlign: "left" }} variant="h6">
                {product.productname}
              </Typography>
              <Typography sx={{ textAlign: "left" }} variant="body1">
                {" "}
                Rs. {Number(product.price)}{" "}
              </Typography>
              <Typography sx={{ textAlign: "left" }} variant="body1">
                {" "}
                Rs.{" "}
                {Number(
                  Number(product.price).toFixed(2) * (product.quantity || 0)
                ).toFixed(2)}{" "}
              </Typography>
            </Box>
            <Box>
              Qty:{" "}
              <TextField
                value={product.quantity === 0 ? "" : product.quantity}
                type="number"
                onChange={(e) =>
                  updateQuantity(e.target.value, product.productid)
                }
                sx={{
                  padding: "0px 5px",
                  width: "50px",
                  "& .MuiInputBase-root": {
                    "& input": {
                      textAlign: "center",
                    },
                  },
                }}
                variant="standard"
              ></TextField>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Purchase;

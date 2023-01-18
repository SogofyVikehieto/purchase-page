import { Box, Typography, Container, TextField, Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveOrder } from "../helpers/purchaseHelper";
import useFormDetails from "../helpers/useFormDetails";
import useProducts from "../helpers/useProducts";
import { useLoadingContext } from "../../../../contexts/LoadingContext";

function Purchase({ setSuccessData, setFormData }) {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { setIsLoading } = useLoadingContext();
  const {
    formDetails,
    formDetails: { distributorid, distributorname, retailername },
    error: formError,
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
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [cart, setCart] = useState({ price: 0, items: 0, products: 0 });

  const submitButton = useRef();

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

  useEffect(() => {
    setFormData(formDetails);
  }, [formDetails]);

  const addOrder = async () => {
    setError("");
    setIsLoading("Placing order");
    const orderProducts = products.filter(
      (product) => product.quantity && product.quantity > 0
    );
    if (!orderProducts.length > 0) {
      setError("Your cart is empty. Please add products to place an order");
      return;
    }
    submitButton.current.disabled = true;
    try {
      const res = await saveOrder(
        formId,
        orderProducts.length,
        cart.price,
        "cash",
        discount,
        cart.price - (cart.price * discount) / 100,
        orderProducts
      );
      if (!res.error) {
        setSuccessData(res.data);
        navigate("/success");
        return;
      }
      setError(res.error);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      submitButton.current.disabled = false;
      setIsLoading("");
    }
  };

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
      <Box style={{ textAlign: "left", marginBottom: "2%" }}>
        {formError && <Typography>{formError}</Typography>}
        {productsError && <Typography>{productsError}</Typography>}

        <Typography variant="body1">Supplier: {distributorname}</Typography>
        <Typography variant="body1">Retailer: {retailername}</Typography>
        <Typography>Items: {cart.items}</Typography>
        <Typography>Products: {cart.products}</Typography>
        <Typography variant="body2">Rs. {cart.price}</Typography>
      </Box>
      <Box>
        <TextField
          size="small"
          style={{
            width: "100%",
            mb: 2,
            textAlign: "center",
            backgroundColor: "#FBFFFF",
            marginBottom: "2%",
          }}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          variant="outlined"
          label="Search Products"
        />
      </Box>
      <Box style={{ overflowY: "scroll", maxHeight: "60vh" }}>
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
              <Typography sx={{ textAlign: "left" }} variant="body1">
                {product.productname}
              </Typography>
              <Typography sx={{ textAlign: "left" }} variant="body2">
                {" "}
                Rs. {Number(product.price)}{" "}
              </Typography>
              <Typography sx={{ textAlign: "left" }} variant="body2">
                {" "}
                Rs.{" "}
                {Number(
                  Number(product.price).toFixed(2) * (product.quantity || 0)
                ).toFixed(2)}{" "}
              </Typography>
            </Box>
            <Box
              component="div"
              style={{
                display: "flex",
                alignItems: "end",
              }}
            >
              Qty:{" "}
              <TextField
                value={product.quantity === 0 ? "" : product.quantity}
                type="number"
                onChange={(e) =>
                  updateQuantity(e.target.value, product.productid)
                }
                sx={{
                  padding: "3px 5px",
                  width: "60px",
                  "& .MuiInputBase-root": {
                    "& input": {
                      textAlign: "center",
                      fontSize: 16,
                      backgroundColor: "#C8DBFF",
                    },
                  },
                }}
                variant="standard"
              ></TextField>
            </Box>
          </Box>
        ))}
      </Box>
      {error && <Typography>{error}</Typography>}
      <Button
        ref={submitButton}
        variant="contained"
        style={{ backgroundColor: "#1629cc" }}
        onClick={addOrder}
      >
        Place order
      </Button>
    </Container>
  );
}

export default Purchase;

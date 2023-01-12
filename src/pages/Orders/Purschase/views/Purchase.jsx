import { Box, Typography, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const data = [
  {
    discount: 0,
    manufacturer: null,
    price: 88.14,
    productid: "22",
    productname: "Apple Cider Vinegar (490 Ml) G",
    quantity: "5",
    totalpages: "36",
  },
  {
    discount: 0,
    manufacturer: null,
    price: 88.14,
    productid: "23",
    productname: "Apple Cider Vinegar (500ml)",
    quantity: "5",
    totalpages: "36",
  },
  {
    discount: 0,
    manufacturer: null,
    price: 118.64,
    productid: "24",
    productname: "BADAM ESSENCE 10*20ML",
    quantity: "5",
    totalpages: "36",
  },
  {
    discount: 0,
    manufacturer: null,
    price: 158.63,
    productid: "25",
    productname: "BADAM MILK MIX10*20 ML",
    quantity: "3",
    totalpages: "36",
  },
  {
    discount: 0,
    manufacturer: null,
    price: 111.61,
    productid: "26",
    productname: "Bakers Barbeque Sauce(500 )",
    quantity: 30,
    totalpages: "36",
  },
];

function Purchase() {
  const [products, setProducts] = useState(data);
  const [searchFilter, setSearchFilter] = useState("");
  const [total, setTotal] = useState(0);

  const updateQuantity = (amount, id) => {
    setProducts((products) => {
      let obj = [...products];
      let index = obj.findIndex((item) => item.productid === id);
      obj[index].quantity = parseInt(amount || 0);
      return obj;
    });
  };

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity * product.price;
    });
    setTotal(parseFloat(total).toFixed(2));
  }, [products]);

  return (
    <Container>
      <Box>
        <Typography variant="h4">Purchase Order</Typography>
      </Box>
      <Box>
        <Typography variant="body1"> Ganesh stores</Typography>
        <Typography variant="body2">Rs. {total}</Typography>
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
        {products
          .filter(
            (product) =>
              searchFilter === "" ||
              product.productname
                .toLowerCase()
                .includes(searchFilter.toLowerCase())
          )
          .map((product, idx) => (
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
                  Rs. {product.price}{" "}
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

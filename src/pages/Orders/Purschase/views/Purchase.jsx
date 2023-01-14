import { Box, Typography, Container, TextField, Button, createTheme } from "@mui/material";
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

  const {palette}=createTheme();
  const {augmentColor}=palette;
  const createColor = (mainColor)=>augmentColor({color:{main:mainColor}})

  const theme = createTheme({
    palette:{
      bogoColorLight:createColor("#7986cb"),
      bogoColorDark:createColor("#1a237e")
    }
  })
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
      <Box sx={{marginBottom:"6px"}}>
       <Typography variant="body1">Outlet: Ganesh Stores </Typography>
        <Typography variant="body2">Total Amount: {`\u20B9`} {total}</Typography>
      </Box>
      <Box>
        <TextField
          style={{ width: "100%", mb: 2, textAlign: "center" }}
          inputProps={{sx:{height:{lg:20,md:20,sm:10,xs:12}}}}
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
                <Typography sx={{ textAlign: "left",fontSize:{md:18,sm:16,xs:13}}} variant="h6">
                  {product.productname}
                </Typography>
                <Typography sx={{ textAlign: "left",fontSize:{md:18,sm:16,xs:13} }} variant="body1">
                  {" "}
                Price: {`\u20B9`} {product.price}{" "}
                </Typography>
              </Box>
              <Box variant="body1">
                Qty: {" "}
                <TextField
                  value={product.quantity === 0 ? "" : product.quantity}
                  type="number"
                  onChange={(e)=>{
                    if (e.target.value.includes("-")) return;
            if (
              e.target.value == "" ||
              (Number.isInteger(parseInt(e.target.value)) && parseInt(e.target.value) > 0)
            )
              updateQuantity(e.target.value, product.productid);
            else return;

                  }}
                  sx={{
                    padding: "0px 5px",
                    width: "50px",
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                  style={{backgroundColor:"#8c9eff"}}
                  variant="standard"
                ></TextField>
              </Box>
            </Box>
          ))}
      </Box>
      <Button variant="contained" style={{backgroundColor:"#6200ea",marginTop:"10px"}} sx={{transform:"none"}}>Place Order</Button>
    </Container>
  );
}

export default Purchase;

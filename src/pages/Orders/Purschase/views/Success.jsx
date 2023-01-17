import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";

function Success({ successData, formData }) {
  return (
    <>
      {successData && formData ? (
        <Container>
          <Typography
            variant="h5"
            style={{
              marginTop: "6%",
              textAlign: "center",
              marginBottom: "4%",
            }}
          >
            Success!
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 500, backgroundColor: "#C8DBFF" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <Typography component="span" variant="body1">
                      Order ID:{" "}
                    </Typography>
                    <Typography component="span" variant="body1">
                      {successData[0]?.orderid}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body1">
                      Retailer Name :{" "}
                    </Typography>
                    {formData?.retailername}
                    <br />
                    <Typography component="span" variant="body1">
                      Supplier Name :{" "}
                    </Typography>
                    {formData?.distributorname}
                    <br />
                    <Typography component="span" variant="body1">
                      Order Date :{" "}
                    </Typography>
                    {new Date().toDateString()}
                    <br />
                  </>
                }
              />
            </ListItem>
          </List>
          <div>
            <div
              id="scrollableTarget"
              style={{
                height: "470px",
                overflow: "auto",
                paddingBottom: "50px",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="h6">Item</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h6">Qty</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h6">Price</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {successData.map((item, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell style={{ fontSize: "0.835rem" }}>
                        <Typography variant="body1">
                          {item.productname}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.productquantity}</TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          ₹
                          {Number(
                            item.productquantity *
                              (item.productprice -
                                (item.productprice * item.discount) / 100)
                          ).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography varaint="h6">
                        ₹{successData[0]?.totalamount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </Container>
      ) : (
        <>
          <Typography
            variant={"h5"}
            style={{
              marginTop: "6%",
              textAlign: "center",
              marginBottom: "4%",
            }}
          >
            No Order.
          </Typography>
          <Typography
            style={{
              marginTop: "6%",
              marginBottom: "4%",
            }}
          >
            Place an order to see details.
          </Typography>
        </>
      )}
    </>
  );
}

export default Success;

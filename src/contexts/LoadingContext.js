import { useContext, useState } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";

const { createContext } = require("react");

const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState("");

  const setIsLoading = (value) => {
    setLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ loading, setIsLoading }}>
      {children}
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Box>
            <CircularProgress color="inherit" />
            <br />
            <Box style={{ marginTop: 20 }}>{loading}</Box>
          </Box>
        </Backdrop>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

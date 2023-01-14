import { useState, useEffect } from "react";
import axiosInstance from "../../../../constants/axiosInstance";

const useProducts = ({
  distributorId,
  categoryId,
  searchText,
  pageNumber = 1,
  pageSize = 500,
}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts();
  }, [distributorId, categoryId, searchText]);

  async function getProducts() {
    if (!distributorId || !categoryId || !searchText) return;
    setError("");
    axiosInstance
      .post("/product", {
        user_id: distributorId,
        category_id: categoryId,
        search_text: searchText,
        page_number: pageNumber,
        page_size: pageSize,
      })
      .then((res) => {
        let products = res.data.data;
        products = products.map((product) => ({ ...product, quantity: 0 }));
        setProducts(products);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      });
  }

  const updateQuantity = (amount, id) => {
    setProducts((products) => {
      let obj = [...products];
      let index = obj.findIndex((item) => item.productid === id);
      obj[index].quantity = parseInt(amount || 0);
      return obj;
    });
  };

  return { products, error, updateQuantity };
};

export default useProducts;

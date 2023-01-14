import axiosInstance from "../../../../constants/axiosInstance";

export const saveOrder = async (
  formId,
  totalItems,
  orderTotal,
  paymentMethod,
  discount,
  subTotal,
  products
) => {
  return axiosInstance
    .post("/form/addOrder", {
      formId,
      totalItems,
      orderTotal: Number(orderTotal).toFixed(2),
      paymentMethod,
      discount,
      subTotal: Number(subTotal).toFixed(2),
      products,
    })
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => {
      return { error: err.response?.data?.message || err.message };
    });
};

import { useState, useEffect } from "react";
import axiosInstance from "../../../../constants/axiosInstance";

const useFormDetails = ({ formId }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  useEffect(() => {
    getFormDetails();
  }, [formId]);

  const getFormDetails = async () => {
    axiosInstance
      .get(`/form/${formId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      });
  };

  return { formDetails: data, error };
};

export default useFormDetails;

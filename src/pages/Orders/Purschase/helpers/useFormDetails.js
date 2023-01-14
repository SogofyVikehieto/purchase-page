import { useState, useEffect } from "react";
import axiosInstance from "../../../../constants/axiosInstance";

const useFormDetails = ({ formId }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    getFormDetails();
  }, [formId]);

  async function getFormDetails() {
    setError("");
    axiosInstance
      .get(`/form/${formId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setError("There was an error. It could be an invalid form.");
      });
  }

  return { formDetails: data, error };
};

export default useFormDetails;

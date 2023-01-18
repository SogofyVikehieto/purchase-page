import { useState, useEffect } from "react";
import axiosInstance from "../../../../constants/axiosInstance";
import { useLoadingContext } from "../../../../contexts/LoadingContext";

const useFormDetails = ({ formId }) => {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    getFormDetails();
  }, [formId]);

  async function getFormDetails() {
    setError("");
    setIsLoading("Loading data");
    axiosInstance
      .get(`/form/${formId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setError("There was an error. It could be an invalid form.");
      })
      .finally(() => {
        setIsLoading("");
      });
  }

  return { formDetails: data, error };
};

export default useFormDetails;

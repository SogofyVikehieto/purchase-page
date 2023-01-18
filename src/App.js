import "./App.css";
import Purchase from "./pages/Orders/Purschase/views/Purchase";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from "./pages/Orders/Purschase/views/Success";
import { LoadingContextProvider } from "./contexts/LoadingContext";

function App() {
  const [successData, setSuccessData] = useState(null);
  const [formData, setFormData] = useState({});
  return (
    <div className="App">
      <LoadingContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/success"
              element={
                <Success successData={successData} formData={formData} />
              }
            />
            <Route
              path="/:formId"
              element={
                <Purchase
                  setSuccessData={setSuccessData}
                  setFormData={setFormData}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </LoadingContextProvider>
    </div>
  );
}

export default App;

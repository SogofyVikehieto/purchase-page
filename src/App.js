import "./App.css";
import Purchase from "./pages/Orders/Purschase/views/Purchase";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from "./pages/Orders/Purschase/views/Success";

function App() {
  const [successData, setSuccessData] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/success"
            element={<Success successData={successData} />}
          />
          <Route
            path="/:formId"
            element={<Purchase setSuccessData={setSuccessData} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

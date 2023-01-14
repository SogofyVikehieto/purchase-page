import "./App.css";
import Purchase from "./pages/Orders/Purschase/views/Purchase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:formId" element={<Purchase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

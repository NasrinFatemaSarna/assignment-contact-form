import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}

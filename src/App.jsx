import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddContactPage from "./pages/AddContactPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

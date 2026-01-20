import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddContactPage from "./pages/AddContactPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/assignment-contact-form" element={<HomePage />} />
      <Route path="/assignment-contact-form/add" element={<AddContactPage />} />

      <Route path="/" element={<Navigate to="/assignment-contact-form" replace />} />
      <Route path="/add" element={<Navigate to="/assignment-contact-form/add" replace />} />

      <Route path="*" element={<Navigate to="/assignment-contact-form" replace />} />
    </Routes>
  );
}

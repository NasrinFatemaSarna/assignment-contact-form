
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddContactPage from "./pages/AddContactPage";

export default function App() {
  return (
    <Routes>
      <Route path="/assignment-contact-form/" element={<HomePage />} />
      <Route path="/assignment-contact-form/add" element={<AddContactPage />} />
      <Route path="*" element={<Navigate to="/assignment-contact-form/" replace />} />
    </Routes>
  );
}

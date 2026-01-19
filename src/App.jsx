import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllContacts from "./pages/AllContacts";
import AddContact from "./pages/AddContact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllContacts />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}


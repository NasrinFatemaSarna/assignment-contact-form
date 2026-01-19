import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContactProvider } from "./context/ContactContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>
);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addContact } from "../utils/storage";

export default function AddContact() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill all fields.");
      return;
    }

    addContact({ firstName, lastName, email, phone });
    navigate("/"); // go back to All Contacts page
  }

  return (
    <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Add New Contact</h2>

      <button
        onClick={() => navigate("/")}
        style={{ float: "right", marginTop: -55 }}
        className="btn btn-secondary"
      >
        Back
      </button>

      {error ? (
        <div style={{ marginBottom: 12, color: "white", background: "#d9534f", padding: 10, borderRadius: 6 }}>
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>First Name</label>
          <input
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Last Name</label>
          <input
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Phone</label>
          <input
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
        </div>

        <button type="submit" className="btn btn-success" style={{ width: "100%" }}>
          Save Contact
        </button>
      </form>
    </div>
  );
}


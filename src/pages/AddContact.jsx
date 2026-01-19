import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContacts } from "../context/ContactContext";

export default function AddContact() {
  const { addContact } = useContacts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: ""
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await addContact(form);
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Add New Contact</h2>
          <Link to="/" className="btn btn-secondary">Back</Link>
        </div>

        <form className="card p-3" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              required
              value={form.fname}
              onChange={(e) => setForm({ ...form, fname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              required
              value={form.lname}
              onChange={(e) => setForm({ ...form, lname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <button className="btn btn-success">Save Contact</button>
        </form>
      </div>
    </>
  );
}

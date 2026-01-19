import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteContact, getContacts } from "../utils/storage";

export default function AllContacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;

    return contacts.filter((c) => {
      const full = `${c.firstName} ${c.lastName}`.toLowerCase();
      return (
        full.includes(q) ||
        (c.email || "").toLowerCase().includes(q) ||
        (c.phone || "").toLowerCase().includes(q)
      );
    });
  }, [contacts, query]);

  function handleDelete(id) {
    const updated = deleteContact(id);
    setContacts(updated);
  }

  return (
    <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <h2>All Contacts</h2>

      <div style={{ display: "flex", gap: 10, alignItems: "center", margin: "15px 0" }}>
        <input
          className="form-control"
          placeholder="search contact"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          + Add New
        </button>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30, color: "#666" }}>No Contact Information</div>
      ) : (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
          <table className="table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ width: 120 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

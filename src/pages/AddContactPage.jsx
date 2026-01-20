import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import ContactForm from "../components/ContactForm";

export default function AddContactPage() {
  const navigate = useNavigate();
  const { addContact } = useContacts();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(values) {
    setSaving(true);
    setError("");
    try {
      await addContact(values);
      navigate("/assignment-contact-form");
    } catch (e) {
      setError(e.message || "Failed to add contact");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Add New Contact</h1>
        <Link className="addLink" to="/assignment-contact-form">
          Back
        </Link>
      </header>

      {error && <p className="error">{error}</p>}

      <ContactForm
        initialValues={{ firstName: "", lastName: "", email: "", phone: "" }}
        onSubmit={onSubmit}
        submitText={saving ? "Saving..." : "Save Contact"}
        disabled={saving}
      />
    </div>
  );
}

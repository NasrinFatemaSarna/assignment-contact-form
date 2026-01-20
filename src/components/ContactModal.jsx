import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import ContactForm from "./ContactForm";

export default function ContactModal() {
  const { state, dispatch, updateContact } = useContacts(); // ✅ editContact না
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const c = state.selected;
  if (!c) return null;

  const close = () => dispatch({ type: "CLOSE_MODAL" });

  const switchToEdit = () =>
    dispatch({ type: "OPEN_MODAL", payload: { contact: c, mode: "EDIT" } });

  const onSubmit = async (values) => {
    setSaving(true);
    setError("");
    try {
      const updated = await updateContact(c.id, values);
      dispatch({
        type: "OPEN_MODAL",
        payload: { contact: updated, mode: "VIEW" },
      });
    } catch (e) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modalOverlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>{state.modalMode === "EDIT" ? "Edit Contact" : "Contact Details"}</h2>
          <button className="iconBtn" onClick={close}>✖</button>
        </div>

        {error && <p className="error">{error}</p>}

        {state.modalMode === "VIEW" ? (
          <div className="details">
            <p><b>First Name:</b> {c.firstName || "N/A"}</p>
            <p><b>Last Name:</b> {c.lastName || "N/A"}</p>
            <p><b>Email:</b> {c.email || "N/A"}</p>
            <p><b>Phone:</b> {c.phone || "N/A"}</p>
            <button className="btn" onClick={switchToEdit}>Edit</button>
          </div>
        ) : (
          <ContactForm
            initialValues={{
              firstName: c.firstName || "",
              lastName: c.lastName || "",
              email: c.email || "",
              phone: c.phone || "",
            }}
            onSubmit={onSubmit}
            submitText={saving ? "Updating..." : "Update"}
            disabled={saving}
          />
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import ContactForm from "./ContactForm";

export default function ContactModal() {
  const { state, dispatch, editContact } = useContacts();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const c = state.selected;
  if (!c) return null;

  const close = () => dispatch({ type: "CLOSE_MODAL" });

  const switchToEdit = () =>
    dispatch({ type: "OPEN_MODAL", payload: { contact: c, mode: "EDIT" } });

  const displayFirstName = c.firstName?.trim() || "N/A";
  const displayLastName = c.lastName?.trim() || "N/A";

  const onSubmit = async (values) => {
    setSaving(true);
    setError("");
    try {
      await editContact(c.id, values);

      // update selected locally for instant UI reflect
      dispatch({
        type: "OPEN_MODAL",
        payload: { contact: { ...c, ...values }, mode: "VIEW" },
      });
    } catch (e) {
      setError(e.message || "Update failed");
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
            <p><b>First Name:</b> {displayFirstName}</p>
            <p><b>Last Name:</b> {displayLastName}</p>
            <p><b>Email:</b> {c.email || "N/A"}</p>
            <p><b>Phone:</b> {c.phone || "N/A"}</p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
              <button className="btnIcon gray" onClick={close}>Close</button>
              <button className="btnGreen" onClick={switchToEdit}>Edit</button>
            </div>
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

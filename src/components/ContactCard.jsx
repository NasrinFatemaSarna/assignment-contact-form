import { useContacts } from "../context/ContactContext";

export default function ContactCard({ contact }) {
  const { dispatch, removeContact } = useContacts();

  const fullName =
    `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "Unknown";

  const onShow = () =>
    dispatch({ type: "OPEN_MODAL", payload: { contact, mode: "VIEW" } });

  const onEdit = () =>
    dispatch({ type: "OPEN_MODAL", payload: { contact, mode: "EDIT" } });

  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this contact?");
    if (!ok) return;
    try {
      await removeContact(contact.id);
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  return (
    <div className="card">
      <div className="cardText">
        <div className="name">{fullName.toUpperCase()}</div>
        <div className="sub">{contact.email}</div>
        <div className="sub">{contact.phone}</div>
      </div>

      <div className="actions">
        <button className="iconBtn" onClick={onShow} title="Show">👁</button>
        <button className="iconBtn" onClick={onEdit} title="Edit">✏️</button>
        <button className="iconBtn" onClick={onDelete} title="Delete">🗑</button>
      </div>
    </div>
  );
}

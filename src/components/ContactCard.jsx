import { useContacts } from "../context/ContactContext";

export default function ContactCard({ contact }) {
  const { dispatch, removeContact } = useContacts();

  const firstName = contact.firstName?.trim() || "";
  const lastName = contact.lastName?.trim() || "";

  let displayName = "UNKNOWN";
  if (firstName && lastName) {
    displayName = `${firstName} ${lastName}`;
  } else if (firstName) {
    displayName = firstName;
  } else if (lastName) {
    displayName = lastName;
  }

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
        <div className="name">{displayName.toUpperCase()}</div>
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

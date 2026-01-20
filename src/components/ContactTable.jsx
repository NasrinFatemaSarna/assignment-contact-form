import { useContacts } from "../context/ContactContext";

export default function ContactTable({ contacts }) {
  const { dispatch, removeContact } = useContacts();

  const onShow = (contact) =>
    dispatch({ type: "OPEN_MODAL", payload: { contact, mode: "VIEW" } });

  const onEdit = (contact) =>
    dispatch({ type: "OPEN_MODAL", payload: { contact, mode: "EDIT" } });

  const onDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this contact?");
    if (!ok) return;
    await removeContact(id);
  };

  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c, idx) => (
            <tr key={c.id}>
              <td>{idx + 1}</td>
              <td>{c.firstName || "N/A"}</td>
              <td>{c.lastName || "N/A"}</td>
              <td>{c.email || "N/A"}</td>
              <td>{c.phone || "N/A"}</td>
              <td>
                <div className="actionBtns">
                  <button className="btnIcon blue" onClick={() => onShow(c)}>👁</button>
                  <button className="btnIcon gray" onClick={() => onEdit(c)}>✏</button>
                  <button className="btnIcon red" onClick={() => onDelete(c.id)}>✖</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

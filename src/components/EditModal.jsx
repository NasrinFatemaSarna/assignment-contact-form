import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";

export default function EditModal() {
  const { editContact, setEditContact, updateContact } = useContacts();

  const [form, setForm] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    createdAt: ""
  });

  useEffect(() => {
    if (editContact) setForm(editContact);
  }, [editContact]);

  const close = () => setEditContact(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateContact(form.id, form);
    close();
  };

  if (!editContact) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Contact</h5>
              <button type="button" className="btn-close" onClick={close}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  required
                  value={form.fname || ""}
                  onChange={(e) => setForm({ ...form, fname: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  required
                  value={form.lname || ""}
                  onChange={(e) => setForm({ ...form, lname: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  required
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" onClick={close}>
                Cancel
              </button>
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import { useContacts } from "../context/ContactContext";

export default function ShowModal() {
  const { showContact, setShowContact, setEditContact } = useContacts();

  const close = () => setShowContact(null);

  if (!showContact) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact Details</h5>
              <button type="button" className="btn-close" onClick={close}></button>
            </div>

            <div className="modal-body">
              <p><b>First Name:</b> {showContact.fname}</p>
              <p><b>Last Name:</b> {showContact.lname}</p>
              <p><b>Email:</b> {showContact.email}</p>
              <p><b>Phone:</b> {showContact.phone}</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" onClick={close}>
                Close
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => {
                  setEditContact(showContact);
                  close();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

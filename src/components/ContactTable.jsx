import { useContacts } from "../context/ContactContext";

export default function ContactTable() {
  const { visibleContacts, setShowContact, setEditContact, deleteContact, loading } =
    useContacts();

  if (loading) return <div className="p-3">Loading...</div>;

  if (visibleContacts.length === 0) {
    return <div className="text-center py-3">No Contact Information</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {visibleContacts.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.fname}</td>
              <td>{c.lname}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td width="150">
                <button
                  className="btn btn-sm btn-circle btn-outline-info me-1"
                  title="Show"
                  onClick={() => setShowContact(c)}
                >
                  <i className="fa fa-eye"></i>
                </button>

                <button
                  className="btn btn-sm btn-circle btn-outline-secondary me-1"
                  title="Edit"
                  onClick={() => setEditContact(c)}
                >
                  <i className="fa fa-edit"></i>
                </button>

                <button
                  className="btn btn-sm btn-circle btn-outline-danger"
                  title="Delete"
                  onClick={async () => {
                    if (confirm("Are you sure?")) {
                      await deleteContact(c.id);
                    }
                  }}
                >
                  <i className="fa fa-times"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useContacts } from "../context/ContactContext";

export default function Filter() {
  const { filter, setFilter } = useContacts();

  return (
    <div className="d-flex align-items-center justify-content-between p-3 flex-wrap gap-2">
      <div className="fs-2">
        <i className="fa fa-filter text-success"></i> Filter
      </div>

      <select
        className="form-select"
        style={{ maxWidth: 260 }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="fname">First Name (A → Z)</option>
        <option value="lname">Last Name (A → Z)</option>
        <option value="oldest">Oldest To First</option>
      </select>
    </div>
  );
}

import { useContacts } from "../context/ContactContext";

export default function SearchBar() {
  const { search, setSearch } = useContacts();

  return (
    <div className="input-group w-50" style={{ minWidth: 280 }}>
      <input
        type="text"
        className="form-control"
        placeholder="search contact"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />
      <button className="btn btn-success" type="button">
        Search
      </button>
    </div>
  );
}

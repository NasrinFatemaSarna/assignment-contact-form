import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/Filter";
import ContactList from "../components/ContactList";
import ContactModal from "../components/ContactModal";

export default function HomePage() {
  const { state, derivedContacts } = useContacts();

  return (
    <div className="page">
      <header className="header">
        <h1>Contact App</h1>
        <Link className="addLink" to="/assignment-contact-form/add">
          Add New
        </Link>
      </header>

      <div className="toolbar">
        <SearchBar />
        <FilterBar />
      </div>

      {state.loading && <p className="info">Loading...</p>}
      {state.error && <p className="error">{state.error}</p>}

      {!state.loading && derivedContacts.length === 0 ? (
        <p className="info">No Contact Information</p>
      ) : (
        <ContactList contacts={derivedContacts} />
      )}

      {state.modalOpen && <ContactModal />}
    </div>
  );
}

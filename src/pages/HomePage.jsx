import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import ContactTable from "../components/ContactTable";
import ContactModal from "../components/ContactModal";

export default function HomePage() {
  const { state, dispatch, derivedContacts } = useContacts();

  return (
    <div className="page pageWide">
      <header className="topBar">
        <div className="brand">CONTACT APP</div>
      </header>

      <div className="panel">
        <div className="panelHead">
          <h2>All Contacts</h2>

          <div className="panelActions">
            <input
              className="input"
              placeholder="search contact"
              value={state.search}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", payload: e.target.value })
              }
            />

            {/* ✅ FIXED */}
            <Link className="btnGreen" to="/add">
              + Add New
            </Link>
          </div>
        </div>

        <div className="filterRow">
          <div className="filterTitle">Filter</div>
          <select
            className="select"
            value={state.filter}
            onChange={(e) =>
              dispatch({ type: "SET_FILTER", payload: e.target.value })
            }
          >
            <option value="DEFAULT">Default</option>
            <option value="FIRST_AZ">First Name (A → Z)</option>
            <option value="LAST_AZ">Last Name (A → Z)</option>
            <option value="OLD_FIRST">Oldest To First</option>
          </select>
        </div>

        {state.loading && <p className="info">Loading...</p>}
        {state.error && <p className="error">{state.error}</p>}

        {!state.loading && derivedContacts.length === 0 ? (
          <p className="info">No Contact Information</p>
        ) : (
          <ContactTable contacts={derivedContacts} />
        )}
      </div>

      {state.modalOpen && <ContactModal />}
    </div>
  );
}

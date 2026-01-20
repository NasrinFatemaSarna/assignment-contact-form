import { useContacts } from "../context/ContactContext";

export default function SearchBar() {
  const { state, dispatch } = useContacts();

  return (
    <input
      className="input"
      placeholder="Search first/last/email/phone"
      value={state.search}
      onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
    />
  );
}

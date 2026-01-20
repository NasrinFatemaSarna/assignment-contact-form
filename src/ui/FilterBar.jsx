import { useContacts } from "../context/ContactContext";

export default function FilterBar() {
  const { state, dispatch } = useContacts();

  return (
    <select
      className="select"
      value={state.filter}
      onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })}
    >
      <option value="FIRST_AZ">First Name (A → Z)</option>
      <option value="LAST_AZ">Last Name (A → Z)</option>
      <option value="OLD_FIRST">Oldest To First</option>
    </select>
  );
}

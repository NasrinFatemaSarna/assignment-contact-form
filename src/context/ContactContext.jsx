import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getContactsApi, addContactApi, updateContactApi, deleteContactApi } from "../api/contactApi";

const ContactContext = createContext(null);

const initialState = {
  contacts: [],
  loading: false,
  error: null,

  search: "",
  filter: "OLD_FIRST", // FIRST_AZ | LAST_AZ | OLD_FIRST

  modalOpen: false,
  modalMode: "VIEW", // VIEW | EDIT
  selected: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "ERROR":
      return { ...state, loading: false, error: action.payload || "Error" };

    case "SET_CONTACTS":
      return { ...state, loading: false, error: null, contacts: action.payload || [] };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "OPEN_MODAL":
      return {
        ...state,
        modalOpen: true,
        selected: action.payload.contact,
        modalMode: action.payload.mode,
      };

    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, selected: null, modalMode: "VIEW" };

    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadContacts() {
    dispatch({ type: "LOADING" });
    try {
      const data = await getContactsApi();
      dispatch({ type: "SET_CONTACTS", payload: data });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  }

  async function addContact(values) {
    const createdAt = new Date().toISOString();
    const created = await addContactApi({ ...values, createdAt });
    dispatch({ type: "SET_CONTACTS", payload: [created, ...state.contacts] });
  }

  async function editContact(id, patch) {
    const updated = await updateContactApi(id, patch);
    dispatch({
      type: "SET_CONTACTS",
      payload: state.contacts.map((c) => (c.id === id ? updated : c)),
    });
  }

  async function removeContact(id) {
    await deleteContactApi(id);
    dispatch({ type: "SET_CONTACTS", payload: state.contacts.filter((c) => c.id !== id) });
    dispatch({ type: "CLOSE_MODAL" });
  }

  const derivedContacts = useMemo(() => {
    const q = state.search.trim().toLowerCase();

    let list = [...state.contacts].filter((c) => {
      const hay = `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase();
      return hay.includes(q);
    });

    if (state.filter === "FIRST_AZ") list.sort((a, b) => (a.firstName || "").localeCompare(b.firstName || ""));
    if (state.filter === "LAST_AZ") list.sort((a, b) => (a.lastName || "").localeCompare(b.lastName || ""));
    if (state.filter === "OLD_FIRST") list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

    return list;
  }, [state.contacts, state.search, state.filter]);

  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContactContext.Provider
      value={{ state, dispatch, loadContacts, addContact, editContact, removeContact, derivedContacts }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContacts must be used within ContactProvider");
  return ctx;
}

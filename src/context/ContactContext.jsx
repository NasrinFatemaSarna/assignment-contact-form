import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import {
  getContactsApi,
  addContactApi,
  updateContactApi,
  deleteContactApi,
} from "../api/contactApi";

const ContactContext = createContext(null);

const initialState = {
  contacts: [],
  loading: true,
  error: "",
  search: "",
  filter: "DEFAULT", // DEFAULT | FIRST_AZ | LAST_AZ | OLD_FIRST
  modalOpen: false,
  modalMode: "VIEW", // VIEW | EDIT
  selected: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload, loading: false, error: "" };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "OPEN_MODAL":
      return {
        ...state,
        modalOpen: true,
        modalMode: action.payload.mode,
        selected: action.payload.contact,
      };

    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, modalMode: "VIEW", selected: null };

    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ✅ Load contacts
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const data = await getContactsApi();

        // ✅ ensure firstName/lastName always exist
        const normalized = data.map((c) => ({
          ...c,
          firstName: c.firstName || "",
          lastName: c.lastName || "",
        }));

        dispatch({ type: "SET_CONTACTS", payload: normalized });
      } catch (e) {
        dispatch({
          type: "ERROR",
          payload: e?.message || "Failed to load contacts",
        });
      }
    })();
  }, []);

  // ✅ CRUD
  const addContact = async (payload) => {
    const created = await addContactApi({
      ...payload,
      firstName: payload.firstName || "",
      lastName: payload.lastName || "",
      createdAt: payload.createdAt || new Date().toISOString(),
    });

    dispatch({
      type: "SET_CONTACTS",
      payload: [...state.contacts, created],
    });
  };

  const updateContact = async (id, patch) => {
    const updated = await updateContactApi(id, {
      ...patch,
      firstName: patch.firstName || "",
      lastName: patch.lastName || "",
    });

    dispatch({
      type: "SET_CONTACTS",
      payload: state.contacts.map((c) => (c.id === id ? updated : c)),
    });

    return updated;
  };

  const removeContact = async (id) => {
    await deleteContactApi(id);
    dispatch({
      type: "SET_CONTACTS",
      payload: state.contacts.filter((c) => c.id !== id),
    });
  };

  // ✅ Derived list (search + sort/filter)
  const derivedContacts = useMemo(() => {
    const q = state.search.trim().toLowerCase();

    let list = [...state.contacts];

    // Search by firstName/lastName/email/phone
    if (q) {
      list = list.filter((c) => {
        const hay = `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // Filter/sort
    if (state.filter === "FIRST_AZ") {
      list.sort((a, b) => (a.firstName || "").localeCompare(b.firstName || ""));
    } else if (state.filter === "LAST_AZ") {
      list.sort((a, b) => (a.lastName || "").localeCompare(b.lastName || ""));
    } else if (state.filter === "OLD_FIRST") {
      list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    }

    return list;
  }, [state.contacts, state.search, state.filter]);

  return (
    <ContactContext.Provider
      value={{
        state,
        dispatch,
        derivedContacts,
        addContact,
        updateContact,

        // ✅ alias: আপনার modal যদি editContact কল করে
        editContact: updateContact,

        removeContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export const useContacts = () => useContext(ContactContext);

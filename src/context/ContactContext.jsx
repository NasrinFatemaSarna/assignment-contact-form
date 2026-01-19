import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addContactApi,
  deleteContactApi,
  getContactsApi,
  updateContactApi
} from "../api/contactApi";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("default");
  const [loading, setLoading] = useState(true);

  // modal states
  const [showContact, setShowContact] = useState(null);
  const [editContact, setEditContact] = useState(null);

  // READ
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await getContactsApi();
      setContacts(res.data);
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const addContact = async (data) => {
    const payload = {
      ...data,
      createdAt: new Date().toISOString()
    };
    const res = await addContactApi(payload);
    setContacts((prev) => [...prev, res.data]);
  };

  // UPDATE
  const updateContact = async (id, data) => {
    const res = await updateContactApi(id, data);
    setContacts((prev) => prev.map((c) => (c.id === id ? res.data : c)));
  };

  // DELETE
  const deleteContact = async (id) => {
    await deleteContactApi(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // SEARCH + FILTER computed list
  const visibleContacts = useMemo(() => {
    let list = [...contacts];

    // search (fname/lname/email/phone)
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((c) =>
        `${c.fname} ${c.lname} ${c.email} ${c.phone}`
          .toLowerCase()
          .includes(q)
      );
    }

    // filter
    if (filter === "fname") {
      list.sort((a, b) => a.fname.localeCompare(b.fname));
    } else if (filter === "lname") {
      list.sort((a, b) => a.lname.localeCompare(b.lname));
    } else if (filter === "oldest") {
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
    }

    return list;
  }, [contacts, search, filter]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const value = {
    contacts,
    visibleContacts,
    loading,

    search,
    setSearch,

    filter,
    setFilter,

    showContact,
    setShowContact,

    editContact,
    setEditContact,

    addContact,
    updateContact,
    deleteContact
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);

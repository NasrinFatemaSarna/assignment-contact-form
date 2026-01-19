const KEY = "contacts";

export function getContacts() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function setContacts(contacts) {
  localStorage.setItem(KEY, JSON.stringify(contacts));
}

export function addContact(contact) {
  const contacts = getContacts();

  const newContact = {
    id: Date.now(), // unique id
    firstName: contact.firstName.trim(),
    lastName: contact.lastName.trim(),
    email: contact.email.trim(),
    phone: contact.phone.trim(),
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  setContacts(contacts);
  return newContact;
}

export function deleteContact(id) {
  const contacts = getContacts().filter((c) => c.id !== id);
  setContacts(contacts);
  return contacts;
}

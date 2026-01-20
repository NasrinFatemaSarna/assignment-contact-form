const BASE_URL = "http://localhost:3001";
const RESOURCE = "contacts";

async function http(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const getContactsApi = () => http(`${BASE_URL}/${RESOURCE}`);
export const addContactApi = (payload) =>
  http(`${BASE_URL}/${RESOURCE}`, { method: "POST", body: JSON.stringify(payload) });

export const updateContactApi = (id, patch) =>
  http(`${BASE_URL}/${RESOURCE}/${id}`, { method: "PATCH", body: JSON.stringify(patch) });

export const deleteContactApi = (id) =>
  http(`${BASE_URL}/${RESOURCE}/${id}`, { method: "DELETE" });

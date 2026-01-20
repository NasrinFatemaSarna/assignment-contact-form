const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

const RESOURCE = "contacts";

async function http(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw new Error("API error");
  if (options.method === "DELETE") return true;
  return res.json();
}

export const getContactsApi = async () => {
  const data = await http(`${BASE_URL}/${RESOURCE}`);
  return data.map((c) => ({
    ...c,
    firstName: c.firstName || "",
    lastName: c.lastName || "",
  }));
};

export const addContactApi = async (contact) =>
  http(`${BASE_URL}/${RESOURCE}`, {
    method: "POST",
    body: JSON.stringify({
      ...contact,
      createdAt: new Date().toISOString(),
    }),
  });

export const updateContactApi = (id, contact) =>
  http(`${BASE_URL}/${RESOURCE}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(contact),
  });

export const deleteContactApi = (id) =>
  http(`${BASE_URL}/${RESOURCE}/${id}`, { method: "DELETE" });

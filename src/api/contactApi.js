const BASE_URL = "http://localhost:3001"; // ✅ your json-server port

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Request failed");
  }
  return res.json().catch(() => null);
}

export async function getContactsApi() {
  const res = await fetch(`${BASE_URL}/contacts`);
  return handle(res);
}

export async function addContactApi(payload) {
  const res = await fetch(`${BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function updateContactApi(id, patch) {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return handle(res);
}

export async function deleteContactApi(id) {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return true;
}

import axios from "axios";

export const API_URL = "http://localhost:3001/contacts";


export const getContactsApi = () => axios.get(API_URL);
export const addContactApi = (data) => axios.post(API_URL, data);
export const updateContactApi = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteContactApi = (id) => axios.delete(`${API_URL}/${id}`);

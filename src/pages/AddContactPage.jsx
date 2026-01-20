import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import ContactForm from "../components/ContactForm";

export default function AddContactPage() {
  const { addContact } = useContacts();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await addContact(values);
    navigate("/assignment-contact-form/");
  };

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Add New Contact</h1>
        <button className="btnGreen" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="panelLike">
        <ContactForm onSubmit={onSubmit} submitText="Save Contact" />
      </div>
    </div>
  );
}

import ContactCard from "./ContactCard";

export default function ContactList({ contacts }) {
  return (
    <div className="list">
      {contacts.map((c) => (
        <ContactCard key={c.id} contact={c} />
      ))}
    </div>
  );
}

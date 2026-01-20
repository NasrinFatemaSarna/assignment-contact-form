import { useState } from "react";

export default function ContactForm({
  onSubmit,
  initialValues = { firstName: "", lastName: "", email: "", phone: "" },
  submitText = "Save",
  disabled = false,
}) {
  const [form, setForm] = useState(initialValues);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        First Name
        <input
          className="input"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          placeholder="First Name"
          required
        />
      </label>

      <label className="label">
        Last Name
        <input
          className="input"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          placeholder="Last Name"
          required
        />
      </label>

      <label className="label">
        Email
        <input
          className="input"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
        />
      </label>

      <label className="label">
        Phone
        <input
          className="input"
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone"
          required
        />
      </label>

      <button className="btn" disabled={disabled}>
        {submitText}
      </button>
    </form>
  );
}

import { useState } from "react";

export default function ContactForm({
  initialValues,
  onSubmit,
  submitText = "Save",
  disabled = false,
}) {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) =>
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="formPro" onSubmit={handleSubmit}>
      <div className="grid2">
        <label className="label">
          First Name *
          <input
            className="inputPro"
            name="firstName"
            value={values.firstName}
            onChange={onChange}
            placeholder="e.g. Rani"
            required
          />
        </label>

        <label className="label">
          Last Name *
          <input
            className="inputPro"
            name="lastName"
            value={values.lastName}
            onChange={onChange}
            placeholder="e.g. Zaman"
            required
          />
        </label>

        <label className="label">
          Email
          <input
            className="inputPro"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            placeholder="e.g. rani@gmail.com"
          />
          <small>Optional — used for quick contact.</small>
        </label>

        <label className="label">
          Phone *
          <input
            className="inputPro"
            name="phone"
            value={values.phone}
            onChange={onChange}
            placeholder="e.g. 0897896875785"
            required
          />
          <small>Digits only. You may include +countrycode.</small>
        </label>
      </div>

      <button className="btnPrimary" disabled={disabled} type="submit">
        {submitText}
      </button>
    </form>
  );
}

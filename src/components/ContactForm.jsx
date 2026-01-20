import { useMemo, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ initialValues, onSubmit, submitText, disabled }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};

    const firstName = (values.firstName || "").trim();
    const lastName = (values.lastName || "").trim();
    const email = (values.email || "").trim();
    const phone = (values.phone || "").trim();

    if (!firstName) e.firstName = "First name is required";
    if (!lastName) e.lastName = "Last name is required";

    if (!phone) e.phone = "Phone is required";
    else if (!/^\+?\d{8,15}$/.test(phone)) e.phone = "Phone must be 8–15 digits (optional +)";

    if (email && !emailRegex.test(email)) e.email = "Please enter a valid email";

    return e;
  }, [values]);

  const hasErrors = Object.keys(errors).length > 0;

  const setField = (k, v) => setValues((p) => ({ ...p, [k]: v }));
  const markTouched = (k) => setTouched((p) => ({ ...p, [k]: true }));

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, phone: true });

    if (hasErrors) return;

    setSubmitting(true);
    try {
      await onSubmit({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      });
    } finally {
      setSubmitting(false);
    }
  }

  const isDisabled = disabled || submitting;

  return (
    <form className="formPro" onSubmit={handleSubmit} noValidate>
      <div className="formHeader">
        <div>
          <h3 className="formTitle">Contact Information</h3>
          <p className="formSub">Fill in the details below. Fields marked * are required.</p>
        </div>
      </div>

      <div className="grid2">
        <Field
          label="First Name"
          required
          value={values.firstName}
          placeholder="e.g. Rani"
          onChange={(v) => setField("firstName", v)}
          onBlur={() => markTouched("firstName")}
          error={touched.firstName ? errors.firstName : ""}
          disabled={isDisabled}
        />

        <Field
          label="Last Name"
          required
          value={values.lastName}
          placeholder="e.g. Zaman"
          onChange={(v) => setField("lastName", v)}
          onBlur={() => markTouched("lastName")}
          error={touched.lastName ? errors.lastName : ""}
          disabled={isDisabled}
        />
      </div>

      <div className="grid2">
        <Field
          label="Email"
          value={values.email}
          placeholder="e.g. rani@gmail.com"
          type="email"
          onChange={(v) => setField("email", v)}
          onBlur={() => markTouched("email")}
          error={touched.email ? errors.email : ""}
          disabled={isDisabled}
          helper="Optional — used for quick contact."
        />

        <Field
          label="Phone"
          required
          value={values.phone}
          placeholder="e.g. 0897896875785"
          type="tel"
          onChange={(v) => setField("phone", v)}
          onBlur={() => markTouched("phone")}
          error={touched.phone ? errors.phone : ""}
          disabled={isDisabled}
          helper="Digits only. You may include +countrycode."
        />
      </div>

      <div className="formActions">
        <button className="btnPrimary" type="submit" disabled={isDisabled || hasErrors}>
          {isDisabled ? "Please wait..." : submitText}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  value,
  placeholder,
  type = "text",
  onChange,
  onBlur,
  error,
  disabled,
  helper,
}) {
  return (
    <div className="field">
      <div className="fieldLabelRow">
        <label className="fieldLabel">
          {label} {required ? <span className="req">*</span> : null}
        </label>
        {error ? <span className="fieldErrorMini">{error}</span> : null}
      </div>

      <input
        className={`inputPro ${error ? "inputProError" : ""}`}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
      />

      {helper ? <div className="fieldHelp">{helper}</div> : null}
    </div>
  );
}

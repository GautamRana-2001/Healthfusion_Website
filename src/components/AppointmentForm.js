"use client";

import { useMemo, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTodayIso() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function AppointmentForm() {
  const minDate = useMemo(() => getTodayIso(), []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    treatment: "",
    date: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = (v) => {
    const errors = {};

    if (!v.name.trim()) errors.name = "Name is required.";

    if (!v.email.trim()) errors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(v.email.trim()))
      errors.email = "Please enter a valid email address.";

    const mobile = v.mobile.replace(/\D/g, "");
    if (!mobile) errors.mobile = "Mobile number is required.";
    else if (mobile.length !== 10)
      errors.mobile = "Mobile number must be exactly 10 digits.";

    if (!v.treatment) errors.treatment = "Please select a treatment.";

    if (!v.date) errors.date = "Date is required.";
    else {
      const selected = new Date(v.date);
      selected.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errors.date = "Date cannot be in the past.";
    }

    return errors;
  };

  const errors = useMemo(() => validate(values), [values]);
  const canSubmit = Object.keys(errors).length === 0;

  const handleChange = (key) => (e) => {
    const next = e.target.value;
    setValues((prev) => ({ ...prev, [key]: next }));
  };

  const handleBlur = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      mobile: true,
      treatment: true,
      date: true,
      notes: true,
    });

    const finalErrors = validate(values);
    if (Object.keys(finalErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.mobile.replace(/\D/g, ""),
        treatment: values.treatment,
        date: values.date,
        message: values.notes.trim(),
      };

      // Add timeout for better UX
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.success !== true) {
        throw new Error(
          data?.message || "Failed to submit appointment request."
        );
      }

      setSubmitted(true);
      setValues({
        name: "",
        email: "",
        mobile: "",
        treatment: "",
        date: "",
        notes: "",
      });
      setTouched({});
    } catch (err) {
      if (err.name === 'AbortError') {
        setSubmitError("Request timed out. Please check your connection and try again.");
      } else {
        setSubmitError(err?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "peer w-full rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-4 pt-6 pb-2 text-[15px] text-[#0B0F19] outline-none shadow-sm transition focus:border-[#0077C8]/40 focus:ring-4 focus:ring-[#0077C8]/10";

  const labelClass =
    "pointer-events-none absolute left-4 top-2 text-xs font-semibold text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold";

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#00A651]/20 bg-gradient-to-br from-[#00A651]/10 to-white p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#00A651] flex-shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B0F19]">
              Appointment request sent
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              We’ve received your details. Our team will contact you shortly to
              confirm your slot.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0077C8] text-white px-6 py-3 font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <input
              value={values.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder=" "
              className={fieldClass}
              autoComplete="name"
            />
            <label className={labelClass}>Full name *</label>
          </div>
          {touched.name && errors.name ? (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder=" "
              className={fieldClass}
              autoComplete="email"
              inputMode="email"
            />
            <label className={labelClass}>Email *</label>
          </div>
          {touched.email && errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <input
              value={values.mobile}
              onChange={handleChange("mobile")}
              onBlur={handleBlur("mobile")}
              placeholder=" "
              className={fieldClass}
              autoComplete="tel"
              inputMode="numeric"
            />
            <label className={labelClass}>Mobile (10 digits) *</label>
          </div>
          {touched.mobile && errors.mobile ? (
            <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <select
              value={values.treatment}
              onChange={handleChange("treatment")}
              onBlur={handleBlur("treatment")}
              className={fieldClass}
            >
              <option value="" disabled>
                Select treatment
              </option>
              <option value="Dermatology">Dermatology</option>
              {/* <option value="Hair">Hair</option> */}
              <option value="Laser">Fusion</option>
              <option value="Ayurveda">Ayurveda</option>
              <option value="Other">Other</option>
            </select>
            <label className={labelClass}>Treatment *</label>
          </div>
          {touched.treatment && errors.treatment ? (
            <p className="mt-1 text-xs text-red-600">{errors.treatment}</p>
          ) : null}
        </div>
      </div>

      <div>
        <div className="relative">
          <input
            type="date"
            value={values.date}
            onChange={handleChange("date")}
            onBlur={handleBlur("date")}
            min={minDate}
            className={fieldClass}
          />
          <label className={labelClass}>Preferred date *</label>
        </div>
        {touched.date && errors.date ? (
          <p className="mt-1 text-xs text-red-600">{errors.date}</p>
        ) : null}
      </div>

      <div>
        <div className="relative">
          <textarea
            value={values.notes}
            onChange={handleChange("notes")}
            onBlur={handleBlur("notes")}
            placeholder=" "
            rows={3}
            className={`${fieldClass} resize-none`}
          />
          <label className={labelClass}>Notes (optional)</label>
        </div>
      </div>

      {submitError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0077C8] text-white px-6 py-3 sm:py-4 font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Appointment Request"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to be contacted for appointment confirmation.
      </p>
    </form>
  );
}

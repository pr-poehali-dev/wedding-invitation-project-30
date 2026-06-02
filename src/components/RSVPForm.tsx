import { useState, useRef } from "react";

const RSVP_URL = "https://functions.poehali.dev/093c40fd-ee47-4a93-896f-12b9205eba16";

export default function RSVPForm() {
  const [form, setForm] = useState({ name: "", attending: "yes", guests: "1", dietary: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(RSVP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Ошибка при отправке");
      }
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12" style={{ border: "1px solid #111", padding: "48px 32px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 300 }} className="italic mb-4">
          Спасибо, {form.name}!
        </div>
        <p style={{ fontSize: 14, color: "#111" }}>Мы получили ваш ответ и с нетерпением ждём встречи.</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #ddd",
    padding: "12px 16px",
    background: "transparent",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 14,
    color: "#111",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#111", display: "block", marginBottom: 8 }}>Ваше имя *</label>
        <input
          required
          style={inputStyle}
          placeholder="Имя и фамилия"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          onFocus={e => (e.target.style.borderColor = "#111")}
          onBlur={e => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      <div>
        <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#111", display: "block", marginBottom: 8 }}>Присутствие *</label>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ val: "yes", label: "Приду" }, { val: "no", label: "Не смогу" }].map(opt => (
            <label key={opt.val} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flex: 1, border: `1px solid ${form.attending === opt.val ? "#111" : "#ddd"}`, padding: "12px 16px", fontSize: 14, transition: "border-color 0.2s" }}>
              <input type="radio" name="attending" value={opt.val} checked={form.attending === opt.val} onChange={e => setForm({ ...form, attending: e.target.value })} style={{ accentColor: "#111" }} />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {form.attending === "yes" && (
        <div>
          <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#111", display: "block", marginBottom: 8 }}>Количество гостей</label>
          <select
            style={{ ...inputStyle, cursor: "pointer" }}
            value={form.guests}
            onChange={e => setForm({ ...form, guests: e.target.value })}
            onFocus={e => (e.target.style.borderColor = "#111")}
            onBlur={e => (e.target.style.borderColor = "#ddd")}
          >
            {["1", "2", "3", "4"].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      )}

      <div>
        <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#111", display: "block", marginBottom: 8 }}>Контактный номер</label>
        <input
          type="tel"
          style={inputStyle}
          placeholder="+7 (___) ___-__-__"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          onFocus={e => (e.target.style.borderColor = "#111")}
          onBlur={e => (e.target.style.borderColor = "#ddd")}
        />
      </div>

      {error && <p style={{ fontSize: 13, color: "#c00", textAlign: "center" }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#888" : "#111",
          color: "#fff",
          border: "none",
          padding: "16px 40px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          marginTop: 8,
        }}
        onMouseEnter={e => { if (!loading) (e.target as HTMLButtonElement).style.background = "#333"; }}
        onMouseLeave={e => { if (!loading) (e.target as HTMLButtonElement).style.background = "#111"; }}
      >
        {loading ? "Отправка..." : "Подтвердить присутствие"}
      </button>
    </form>
  );
}

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-07-04T17:00:00");
const COUPLE_PHOTO = "https://cdn.poehali.dev/files/286c8940-d027-4fd3-8434-8a7364a85ee7.jpg";

const PROGRAM = [
  { time: "12:00", title: "Выкуп невесты", desc: "п. Аккермановка, ул. Солнечная 7" },
  { time: "13:30", title: "Церемония бракосочетания", desc: "г. Новотроицк, ул. Советская 51" },
  { time: "14:00", title: "Свадебная фотосессия", desc: "" },
  { time: "17:00", title: "Свадебный банкет", desc: "Арт-кафе «Чехов», г. Новотроицк, ул. Свистунова 7" },
  { time: "22:00", title: "Торжественное завершение", desc: "" },
];

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      past: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const RSVP_URL = "https://functions.poehali.dev/093c40fd-ee47-4a93-896f-12b9205eba16";

function RSVPForm() {
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
        <p style={{ fontSize: 14, color: "#888" }}>Мы получили ваш ответ и с нетерпением ждём встречи.</p>
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
        <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Ваше имя *</label>
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
        <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Присутствие *</label>
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
          <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Количество гостей</label>
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
        <label style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Пожелания молодожёнам</label>
        <textarea
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Ваши тёплые слова..."
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

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <div style={{ background: "#f9f7f4", fontFamily: "'Montserrat', sans-serif", color: "#111" }}>
      <style>{`
        body {
          background-color: #f9f7f4;
        }

        .classic-bg {
          background-color: #f9f7f4;
          background-image:
            linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0,0,0,0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.03) 75%);
          background-size: 40px 40px;
          background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
        }

        .hero-bg {
          background-color: #f9f7f4;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px);
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink-bar {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .fade-up-1 { animation: fade-up 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fade-up 0.7s ease 0.25s both; }
        .fade-up-3 { animation: fade-up 0.7s ease 0.4s both; }
        .fade-up-4 { animation: fade-up 0.7s ease 0.55s both; }
        .fade-up-5 { animation: fade-up 0.7s ease 0.7s both; }
        .fade-up-6 { animation: fade-up 0.7s ease 0.85s both; }

        .blink { animation: blink-bar 1.2s ease-in-out infinite; }

        .mono-divider {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mono-divider::before, .mono-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #111;
        }

        .countdown-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 72px;
        }
        .countdown-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 300;
          line-height: 1;
          color: #111;
          letter-spacing: -2px;
        }
        .countdown-label {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #888;
          margin-top: 6px;
        }
        .countdown-sep {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 300;
          color: #ccc;
          margin-bottom: 24px;
        }

        .detail-card {
          border: 1px solid #e5e5e5;
          padding: 32px 24px;
          text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .detail-card:hover {
          border-color: #111;
          box-shadow: 4px 4px 0 #111;
        }

        .program-item {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 20px 0;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.2s;
        }
        .program-item:last-child { border-bottom: none; }
        .program-item:hover { background: #fafafa; }

        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #aaa;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .scroll-hint:hover { color: #111; }

        .section-label {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 16px;
        }

        .past-badge {
          display: inline-block;
          border: 1px solid #111;
          padding: 6px 20px;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 16px;
        }
      `}</style>

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 hero-bg"
        style={{ minHeight: "100vh", borderBottom: "1px solid #ddd" }}
      >
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 24, left: 24, width: 32, height: 32, borderTop: "1px solid #111", borderLeft: "1px solid #111" }} />
        <div style={{ position: "absolute", top: 24, right: 24, width: 32, height: 32, borderTop: "1px solid #111", borderRight: "1px solid #111" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24, width: 32, height: 32, borderBottom: "1px solid #111", borderLeft: "1px solid #111" }} />
        <div style={{ position: "absolute", bottom: 24, right: 24, width: 32, height: 32, borderBottom: "1px solid #111", borderRight: "1px solid #111" }} />

        <div className="max-w-2xl mx-auto">
          <p className="fade-up-1 section-label my-2 mx-[17px] px-0 py-1.5 text-xs font-semibold text-[#000000] text-center">Свадебное приглашение</p>

          <div
            className="fade-up-2 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 10vw, 6rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-1px" }}
          >
            Анна & Равиль
          </div>

          <div className="fade-up-3 mono-divider my-8">
            <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#aaa" }}>04 · 07 · 2026</span>
          </div>

          <div className="fade-up-4" style={{ margin: "0 auto 32px", maxWidth: 320 }}>
            <img
              src={COUPLE_PHOTO}
              alt="Анна и Равиль"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                objectPosition: "top",
                border: "1px solid #e5e5e5",
                display: "block",
              }}
            />
          </div>

          <p
            className="fade-up-5 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "#444", fontWeight: 300 }}
          >
            «Двое становятся одним<br />в день, когда начинается вечность»
          </p>

          <div className="fade-up-6 mt-10 flex items-center justify-center gap-2" style={{ color: "#888", fontSize: 13 }}>
            <Icon name="MapPin" size={14} />
            <span style={{ letterSpacing: "0.05em" }}>Арт-кафе «Чехов», г. Новотроицк</span>
          </div>
        </div>


      </section>

      {/* Countdown */}

      <section id="countdown" className="py-24 px-6 text-center classic-bg" style={{ borderBottom: "1px solid #ddd" }}>
        <p className="section-label">До начала торжества</p>
        <h2
          className="italic mb-16"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300 }}
        >
          Обратный отсчёт
        </h2>

        {countdown.past ? (
          <div>
            <div
              className="italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 300, color: "#111" }}
            >
              Этот день уже наступил
            </div>
            <p className="past-badge">10 июля 2016</p>
          </div>
        ) : (
          <div className="flex items-end justify-center gap-4 flex-wrap">
            {[
              { val: String(countdown.days).padStart(2, "0"), label: "дней" },
              { val: String(countdown.hours).padStart(2, "0"), label: "часов" },
              { val: String(countdown.minutes).padStart(2, "0"), label: "минут" },
              { val: String(countdown.seconds).padStart(2, "0"), label: "секунд" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-end gap-4">
                <div className="countdown-box">
                  <div className="countdown-num">{item.val}</div>
                  <div className="countdown-label">{item.label}</div>
                </div>
                {i < 3 && <div className="countdown-sep blink">:</div>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Details */}
      <section className="py-24 px-6" style={{ background: "#f9f7f4", borderBottom: "1px solid #ddd" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label text-[#000000]">Детали торжества</p>
            <h2 className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300 }}>
              Церемония & Банкет
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Calendar", label: "Дата", value: "4 июля 2026", sub: "Суббота" },
              { icon: "Clock", label: "Время начала банкета", value: "17:00", sub: "Сбор гостей с 16:30" },
              { icon: "MapPin", label: "Место", value: "Арт-кафе «Чехов»", sub: "г. Новотроицк" },
            ].map((item) => (
              <div key={item.label} className="detail-card">
                <div className="mb-4 flex justify-center">
                  <Icon name={item.icon} size={20} />
                </div>
                <p className="section-label mb-2 text-[#000000] text-[0.63rem]">{item.label}</p>
                <p className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 400 }}>{item.value}</p>
                <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-24 px-6 classic-bg" style={{ borderBottom: "1px solid #ddd" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">Программа дня</p>
            <h2 className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300 }}>
              Расписание праздника
            </h2>
          </div>

          <div>
            {PROGRAM.map((item, i) => (
              <div key={i} className="program-item">
                <div style={{ width: 60, flexShrink: 0, paddingTop: 2 }}>
                  <span style={{ fontSize: 13, color: "#aaa", fontVariantNumeric: "tabular-nums" }}>{item.time}</span>
                </div>
                <div style={{ width: 1, background: "#e5e5e5", alignSelf: "stretch", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, marginBottom: 4 }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "#888" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details notes */}
      <section className="py-24 px-6" style={{ background: "#f9f7f4", borderBottom: "1px solid #ddd" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">Важная информация</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              "Нам хотелось бы сделать этот день добрым, уютным и семейным, поэтому просим Вас воздержаться от криков «Горько!»",
              "Не переживайте, мы не будем вызывать гостей говорить тосты. Во время нашей свадьбы будет действовать «Открытый микрофон».",
              "Важно! Не забудьте положить в карман мелочь – она пригодится для весёлых испытаний и поможет молодым в семейной жизни.",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  padding: "24px 0",
                  borderBottom: i < 2 ? "1px solid #e5e5e5" : "none",
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  border: "1px solid #111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  marginTop: 2,
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#333" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6 classic-bg" style={{ borderBottom: "1px solid #ddd" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">Анкета гостя</p>
            <h2 className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300 }}>
              Анкета гостя
            </h2>
            <p style={{ fontSize: 13, color: "#888", marginTop: 12 }}>Пожалуйста, заполните форму до 20 июня 2026</p>
          </div>

          <RSVPForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center" style={{ background: "#111" }}>
        <div
          className="italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300, color: "#fff", marginBottom: 12 }}
        >
          Анна & Равиль
        </div>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#666", textTransform: "uppercase" }}>
          04 · 07 · 2026
        </p>
      </footer>
    </div>
  );
}
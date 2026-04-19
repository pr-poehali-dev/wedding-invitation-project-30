import { useState } from "react";
import Icon from "@/components/ui/icon";

const flowerImg = "https://cdn.poehali.dev/projects/ab1002c7-9042-4a9f-bffe-64f867186fb8/files/2cf8aebc-4d6d-42e1-b02f-f0f61a90eb6a.jpg";

const PROGRAM = [
  { time: "14:00", title: "Сбор гостей", desc: "Встреча и приветственный фуршет" },
  { time: "15:00", title: "Церемония бракосочетания", desc: "Обмен клятвами и кольцами" },
  { time: "16:00", title: "Торжественная фотосессия", desc: "Памятные снимки с молодожёнами" },
  { time: "17:00", title: "Свадебный банкет", desc: "Праздничный ужин и тосты" },
  { time: "19:00", title: "Первый танец", desc: "Танцевальная программа и живая музыка" },
  { time: "23:00", title: "Торжественное завершение", desc: "Разрезание свадебного торта" },
];

export default function Index() {
  const [form, setForm] = useState({ name: "", guests: "1", dietary: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        :root {
          --cream: #fdf8f2;
          --blush: #f2c4c0;
          --dusty-rose: #c9807a;
          --mauve: #8b5a58;
          --gold: #c9a96e;
          --dark: #3d2626;
          --petal: #faeae8;
        }

        @keyframes float-petal {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer-anim {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .petal {
          position: fixed;
          pointer-events: none;
          animation: float-petal linear infinite;
          z-index: 0;
        }

        .fade-up-1 { animation: fade-up 0.8s ease 0.1s both; }
        .fade-up-2 { animation: fade-up 0.8s ease 0.3s both; }
        .fade-up-3 { animation: fade-up 0.8s ease 0.5s both; }
        .fade-up-4 { animation: fade-up 0.8s ease 0.7s both; }
        .fade-up-5 { animation: fade-up 0.8s ease 0.9s both; }

        .shimmer-el { animation: shimmer-anim 3s ease-in-out infinite; }

        .font-display { font-family: 'Cormorant Garamond', serif; }

        .gold-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--gold);
        }
        .gold-divider::before, .gold-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
        }

        .program-dot {
          transition: transform 0.3s, background 0.3s;
        }
        .program-item:hover .program-dot {
          transform: scale(1.4);
          background: var(--dusty-rose) !important;
        }

        .rsvp-input {
          width: 100%;
          border: 1px solid var(--blush);
          border-radius: 8px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: var(--dark);
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .rsvp-input:focus {
          border-color: var(--dusty-rose);
          box-shadow: 0 0 0 3px rgba(201, 128, 122, 0.15);
        }
        .rsvp-input::placeholder { color: #b5a5a5; }

        .btn-primary {
          background: linear-gradient(135deg, var(--dusty-rose), var(--mauve));
          color: white;
          padding: 14px 40px;
          border-radius: 50px;
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(140, 90, 88, 0.35);
        }
        .btn-primary:active { transform: translateY(0); }

        .card-glass {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 169, 110, 0.2);
          border-radius: 20px;
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201, 169, 110, 0.15);
          border: 1px solid rgba(201, 169, 110, 0.4);
          border-radius: 50px;
          padding: 8px 20px;
          color: var(--gold);
          font-size: 13px;
          letter-spacing: 0.5px;
        }
      `}</style>

      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${10 + i * 12}%`,
            top: "-30px",
            animationDuration: `${8 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
            fontSize: `${0.8 + (i % 3) * 0.4}rem`,
          }}
        >
          🌸
        </span>
      ))}

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${flowerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(242,196,192,0.35), transparent), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,169,110,0.15), transparent)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="fade-up-1 font-body text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>
            С любовью приглашают вас
          </p>

          <div className="fade-up-2 font-display italic mb-2" style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", color: "var(--dusty-rose)", fontFamily: "'Cormorant Garamond', serif" }}>
            Александр & Елизавета
          </div>

          <div className="fade-up-3 font-display my-6" style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1, color: "var(--mauve)", letterSpacing: "-2px", fontFamily: "'Cormorant Garamond', serif" }}>
            14.06.2025
          </div>

          <div className="fade-up-4 gold-divider mb-8">
            <span className="shimmer-el text-2xl">✦</span>
          </div>

          <p className="fade-up-4 italic" style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "var(--dark)", opacity: 0.8, fontFamily: "'Cormorant Garamond', serif" }}>
            «Двое становятся одним<br />в день, когда начинается вечность»
          </p>

          <div className="fade-up-5 mt-10">
            <span className="location-badge" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <Icon name="MapPin" size={14} />
              Усадьба «Берёзовая роща», Подмосковье
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center" style={{ zIndex: 10 }}>
          <a href="#program" style={{ color: "var(--dusty-rose)", textDecoration: "none" }}>
            <div className="flex flex-col items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.8 }}>
              <span>ЛИСТАЙТЕ НИЖЕ</span>
              <Icon name="ChevronDown" size={16} />
            </div>
          </a>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 px-6" style={{ background: "var(--petal)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>Детали торжества</p>
          <h2 className="italic mb-12" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>
            Церемония & Банкет
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Calendar", label: "Дата", value: "14 июня 2025", sub: "Суббота" },
              { icon: "Clock", label: "Время начала", value: "14:00", sub: "Сбор гостей с 13:30" },
              { icon: "MapPin", label: "Место", value: "Усадьба «Берёзовая роща»", sub: "д. Николо-Урюпино, 5" },
            ].map((item) => (
              <div key={item.label} className="card-glass p-8 text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--blush), var(--petal))" }}>
                  <Icon name={item.icon} size={20} />
                </div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>{item.label}</p>
                <p className="italic" style={{ fontSize: "1.2rem", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>{item.value}</p>
                <p className="text-xs mt-1" style={{ color: "var(--dusty-rose)", opacity: 0.8, fontFamily: "'Montserrat', sans-serif" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-20 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>Программа дня</p>
            <h2 className="italic" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>
              Расписание праздника
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: "88px", background: "linear-gradient(to bottom, transparent, var(--blush), var(--blush), transparent)" }}
            />

            <div className="space-y-8">
              {PROGRAM.map((item, i) => (
                <div key={i} className="program-item flex items-start gap-6 group">
                  <div className="text-right flex-shrink-0 pt-1" style={{ width: "80px" }}>
                    <span className="text-sm font-medium" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>{item.time}</span>
                  </div>
                  <div className="flex-shrink-0 relative pt-1">
                    <div
                      className="program-dot w-4 h-4 rounded-full border-2"
                      style={{ background: "var(--cream)", borderColor: "var(--dusty-rose)" }}
                    />
                  </div>
                  <div className="card-glass p-5 flex-1">
                    <p className="italic mb-1" style={{ fontSize: "1.15rem", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</p>
                    <p className="text-xs" style={{ color: "var(--mauve)", opacity: 0.8, fontFamily: "'Montserrat', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floral divider */}
      <div className="flex items-center justify-center py-8" style={{ background: "var(--petal)" }}>
        <div className="text-3xl">🌹 &nbsp; 🌿 &nbsp; 🌸</div>
      </div>

      {/* RSVP */}
      <section className="py-20 px-6" style={{ background: "var(--petal)" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>Подтверждение</p>
            <h2 className="italic" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>
              Вы придёте?
            </h2>
            <p className="text-sm mt-4" style={{ color: "var(--mauve)", opacity: 0.8, fontFamily: "'Montserrat', sans-serif" }}>
              Просим подтвердить своё присутствие до 1 мая 2025 года
            </p>
          </div>

          {submitted ? (
            <div className="card-glass p-12 text-center">
              <div className="text-5xl mb-6">🥂</div>
              <h3 className="italic mb-3" style={{ fontSize: "1.8rem", color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>
                Спасибо!
              </h3>
              <p className="text-sm" style={{ color: "var(--mauve)", opacity: 0.8, fontFamily: "'Montserrat', sans-serif" }}>
                Мы получили ваш ответ и ждём вас на нашем торжестве.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-glass p-8 space-y-5">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>
                  Ваше имя *
                </label>
                <input
                  className="rsvp-input"
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>
                  Количество гостей
                </label>
                <select
                  className="rsvp-input"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  style={{ appearance: "none", cursor: "pointer" } as React.CSSProperties}
                >
                  <option value="1">1 гость (только я)</option>
                  <option value="2">2 гостя (я + пара)</option>
                  <option value="3">3 гостя</option>
                  <option value="4+">4 и более</option>
                </select>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>
                  Пожелания к меню
                </label>
                <input
                  className="rsvp-input"
                  placeholder="Вегетарианское, аллергии и т.д."
                  value={form.dietary}
                  onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--gold)", fontFamily: "'Montserrat', sans-serif" }}>
                  Пожелания молодожёнам
                </label>
                <textarea
                  className="rsvp-input"
                  rows={3}
                  placeholder="Напишите тёплые слова..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: "none" }}
                />
              </div>

              <div className="flex justify-center pt-4">
                <button type="submit" className="btn-primary">
                  Подтвердить присутствие
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center" style={{ background: "var(--cream)" }}>
        <div className="shimmer-el text-3xl mb-4">✦</div>
        <p className="italic text-2xl mb-2" style={{ color: "var(--dark)", fontFamily: "'Cormorant Garamond', serif" }}>
          Александр & Елизавета
        </p>
        <p className="text-xs tracking-widest" style={{ color: "var(--gold)", opacity: 0.7, fontFamily: "'Montserrat', sans-serif" }}>
          14 · 06 · 2025
        </p>
      </footer>
    </div>
  );
}
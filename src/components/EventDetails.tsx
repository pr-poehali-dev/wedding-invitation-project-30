import Icon from "@/components/ui/icon";
import RSVPForm from "@/components/RSVPForm";

const PROGRAM = [
  { time: "12:00", title: "Выкуп невесты", desc: "п. Аккермановка, ул. Солнечная 7" },
  { time: "13:30", title: "Церемония бракосочетания", desc: "г. Новотроицк, ул. Советская 51" },
  { time: "14:00", title: "Свадебная фотосессия", desc: "" },
  { time: "17:00", title: "Свадебный банкет", desc: "Арт-кафе «Чехов», г. Новотроицк, ул. Свистунова 7" },
  { time: "22:00", title: "Торжественное завершение", desc: "" },
];

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

interface EventDetailsProps {
  countdown: CountdownTime;
}

export default function EventDetails({ countdown }: EventDetailsProps) {
  return (
    <>
      {/* Calendar */}
      <section className="py-24 px-6 text-center" style={{ borderBottom: "1px solid #e0dbd4", background: "rgba(253,249,244,0.88)" }}>
        <div className="max-w-sm mx-auto">
          <p className="section-label mb-2">Дата торжества</p>
          <h2 className="italic mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300 }}>
            Июль 2026
          </h2>
          <div style={{ border: "1px solid #e0dbd4", background: "#fff", padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
              {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => (
                <div key={d} style={{ fontSize: 10, letterSpacing: "0.15em", color: "#aaa", textAlign: "center", paddingBottom: 8 }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
              {Array.from({ length: 42 }).map((_, i) => {
                const offset = 2;
                const day = i - offset + 1;
                if (day < 1 || day > 31) return <div key={i} />;
                const colIndex = i % 7;
                const isWedding = day === 4;
                const isWeekend = colIndex === 5 || colIndex === 6;
                return (
                  <div key={i} style={{
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: isWedding ? 600 : 400,
                    color: isWedding ? "#111" : isWeekend ? "#999" : "#111",
                    background: "transparent",
                    border: isWedding ? "1.5px solid #111" : "none",
                    borderRadius: "50%",
                  }}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#888", marginTop: 16, letterSpacing: "0.1em" }}>
            4 июля 2026 · суббота
          </p>
        </div>
      </section>

      {/* Countdown */}
      <section id="countdown" className="py-24 px-6 text-center" style={{ borderBottom: "1px solid #e0dbd4", background: "rgba(253,249,244,0.88)" }}>
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
      <section className="py-24 px-6" style={{ background: "rgba(253,249,244,0.88)", borderBottom: "1px solid #e0dbd4" }}>
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
                <p style={{ fontSize: 12, color: "#111", marginTop: 4 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-24 px-6" style={{ borderBottom: "1px solid #e0dbd4", background: "rgba(253,249,244,0.88)" }}>
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
                  <span style={{ fontSize: 13, color: "#111", fontVariantNumeric: "tabular-nums" }}>{item.time}</span>
                </div>
                <div style={{ width: 1, background: "#e5e5e5", alignSelf: "stretch", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, marginBottom: 4 }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "#111" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details notes */}
      <section className="py-24 px-6" style={{ background: "rgba(253,249,244,0.88)", borderBottom: "1px solid #e0dbd4" }}>
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
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#111" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6" style={{ borderBottom: "1px solid #e0dbd4", background: "rgba(253,249,244,0.88)" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">Анкета гостя</p>
            <h2 className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300 }}>
              Анкета гостя
            </h2>
            <p style={{ fontSize: 13, color: "#111", marginTop: 12 }}>Пожалуйста, заполните форму до 20 июня 2026</p>
          </div>

          <RSVPForm />
        </div>
      </section>
    </>
  );
}

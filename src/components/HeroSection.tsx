import Icon from "@/components/ui/icon";

const COUPLE_PHOTO = "https://cdn.poehali.dev/files/286c8940-d027-4fd3-8434-8a7364a85ee7.jpg";

export default function HeroSection() {
  return (
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
        <p className="fade-up-1 section-label px-0 py-1.5 font-semibold text-center text-[#000000] text-sm mx-7 my-[11px]">Свадебное приглашение</p>

        <div
          className="fade-up-2 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 10vw, 6rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-1px" }}
        >
          Анна & Равиль
        </div>

        <div className="fade-up-3 mono-divider my-8">
          <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#111" }}>04 · 07 · 2026</span>
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
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "#111", fontWeight: 300 }}
        >
          «Двое становятся одним<br />в день, когда начинается вечность»
        </p>

        <div className="fade-up-6 mt-10 flex items-center justify-center gap-2" style={{ color: "#111", fontSize: 13 }}>
          <Icon name="MapPin" size={14} />
          <span style={{ letterSpacing: "0.05em" }}>Арт-кафе «Чехов», г. Новотроицк</span>
        </div>
      </div>
    </section>
  );
}

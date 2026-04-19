import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const RSVP_LIST_URL = "https://functions.poehali.dev/a7b09827-e8dc-4546-9f47-cbed3b76cee3";

interface RsvpItem {
  id: number;
  name: string;
  attending: string;
  guests: number;
  dietary: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [items, setItems] = useState<RsvpItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(RSVP_LIST_URL)
      .then(r => r.json())
      .then(data => setItems(data.items || []))
      .catch(() => setError("Не удалось загрузить данные"))
      .finally(() => setLoading(false));
  }, []);

  const coming = items.filter(i => i.attending === "yes");
  const notComing = items.filter(i => i.attending === "no");
  const totalGuests = coming.reduce((s, i) => s + (i.guests || 1), 0);

  const formatDate = (s: string) => {
    const d = new Date(s);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }) + ", " +
      d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f7f4", fontFamily: "'Montserrat', sans-serif", color: "#111" }}>
      <style>{`
        .stat-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          padding: 24px 32px;
          text-align: center;
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          line-height: 1;
        }
        .stat-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #888;
          margin-top: 8px;
        }
        .badge-yes {
          display: inline-block;
          background: #111;
          color: #fff;
          font-size: 10px;
          padding: 3px 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .badge-no {
          display: inline-block;
          border: 1px solid #ccc;
          color: #888;
          font-size: 10px;
          padding: 3px 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .row {
          background: #fff;
          border: 1px solid #e5e5e5;
          padding: 20px 24px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          transition: border-color 0.2s;
        }
        .row:hover { border-color: #111; }
        .section-label {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #aaa;
        }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #e5e5e5", background: "#111", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#666" }}>Анна & Равиль · 04.07.2026</p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#fff", fontStyle: "italic" }}>
            Ответы гостей
          </div>
        </div>
        <a href="/" style={{ color: "#666", fontSize: 12, textDecoration: "none", letterSpacing: "0.2em", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="ArrowLeft" size={14} />
          На сайт
        </a>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { num: items.length, label: "Всего ответов" },
              { num: coming.length, label: "Придут" },
              { num: notComing.length, label: "Не смогут" },
              { num: totalGuests, label: "Гостей всего" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
            <p style={{ fontSize: 13, letterSpacing: "0.2em" }}>Загрузка...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#c00" }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", border: "1px solid #e5e5e5", background: "#fff" }}>
            <Icon name="Inbox" size={32} />
            <p style={{ marginTop: 16, fontSize: 13, color: "#888" }}>Пока нет ни одного ответа</p>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p className="section-label mb-4">{items.length} {items.length === 1 ? "ответ" : items.length < 5 ? "ответа" : "ответов"}</p>
            {items.map(item => (
              <div key={item.id} className="row">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400 }}>{item.name}</span>
                    {item.attending === "yes"
                      ? <span className="badge-yes">Придёт · {item.guests} {item.guests === 1 ? "чел." : "чел."}</span>
                      : <span className="badge-no">Не придёт</span>
                    }
                  </div>
                  {item.dietary && (
                    <p style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                      <span style={{ color: "#aaa" }}>Меню: </span>{item.dietary}
                    </p>
                  )}
                  {item.message && (
                    <p style={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>
                      «{item.message}»
                    </p>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#bbb", textAlign: "right", flexShrink: 0, marginTop: 2 }}>
                  {formatDate(item.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";

const WEDDING_DATE = new Date("2026-07-04T17:00:00");

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

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: "#111" }}>
      <style>{`
        body {
          background-color: #fff;
          background-image: url('https://cdn.poehali.dev/projects/ab1002c7-9042-4a9f-bffe-64f867186fb8/bucket/607c9fe0-fe06-4335-bc2a-96f91dce9ae0.png');
          background-size: auto 100vh;
          background-attachment: fixed;
          background-position: center top;
          background-repeat: repeat-y;
        }

        .classic-bg {
          background-color: rgba(255,255,255,0.75);
          background-image:
            linear-gradient(45deg, rgba(0,0,0,0.015) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0,0,0,0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.03) 75%);
          background-size: 40px 40px;
          background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
        }

        .hero-bg {
          background-color: rgba(255,255,255,0.78);
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
          color: #111;
          margin-top: 6px;
        }
        .countdown-sep {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 300;
          color: #555;
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
          color: #111;
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

      <MusicPlayer />
      <HeroSection />
      <EventDetails countdown={countdown} />

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

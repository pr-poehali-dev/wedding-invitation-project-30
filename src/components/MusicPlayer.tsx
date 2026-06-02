import { useState, useRef } from "react";

const MUSIC_URL = "https://cdn.poehali.dev/projects/ab1002c7-9042-4a9f-bffe-64f867186fb8/bucket/6f719a58-7a8d-4b5b-a5af-e6e8fd0e7775.mp3";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <button
        onClick={toggle}
        title={playing ? "Выключить музыку" : "Включить музыку"}
        style={{
          position: "fixed",
          bottom: 28,
          left: 28,
          zIndex: 100,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid #111",
          background: playing ? "#111" : "rgba(255,255,255,0.92)",
          color: playing ? "#fff" : "#111",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          transition: "background 0.3s, color 0.3s",
          fontSize: 18,
        }}
      >
        {playing ? "♪" : "♪"}
        <span style={{
          position: "absolute",
          width: playing ? 0 : 28,
          height: 1,
          background: "#111",
          transform: "rotate(-45deg)",
          transition: "width 0.2s",
          top: "50%",
          left: "50%",
          marginLeft: playing ? 0 : -14,
        }} />
      </button>
    </>
  );
}

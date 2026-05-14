import { useState, useEffect } from "react";

function TypingText({ text, speed = 16, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
  }, [text]);

  useEffect(() => {
    if (idx >= text.length) {
      onDone && onDone();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed((p) => p + text[idx]);
      setIdx((i) => i + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [idx, text, speed, onDone]);

  return (
    <span style={{ whiteSpace: "pre-line" }}>
      {displayed}
      {idx < text.length && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: "#00F5FF",
            verticalAlign: "text-bottom",
            animation: "blink 1s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

export default TypingText;

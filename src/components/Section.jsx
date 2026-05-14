function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3
        style={{
          color: "#F0F6FC",
          fontWeight: 600,
          fontSize: "1rem",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 4,
            height: 16,
            background: "linear-gradient(135deg, #00F5FF 0%, #8b5cf6 100%)",
            display: "inline-block",
            borderRadius: 2,
            flexShrink: 0,
            boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
          }}
        />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Section;

function BackgroundMesh() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(0, 245, 255, 0.12) 0%, transparent 40%),
          radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)
        `,
        pointerEvents: "none",
        animation: "meshMove 20s ease-in-out infinite",
      }}
    />
  );
}

export default BackgroundMesh;

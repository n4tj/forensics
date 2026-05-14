const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
    ::-webkit-scrollbar-thumb { 
      background: linear-gradient(135deg, #8b5cf6, #00F5FF);
      border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover { 
      background: linear-gradient(135deg, #a78bfa, #22d3ee);
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @keyframes meshMove {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    @media (max-width: 768px) {
      .lab-main {
        flex-direction: column !important;
        height: auto !important;
      }
      .tutor-panel {
        width: 100% !important;
      }
    }

    button { font-family: inherit; }
  `}</style>
);

export default GlobalStyles;

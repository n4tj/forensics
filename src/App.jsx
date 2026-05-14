// ── APP SHELL ONLY ──
// Pages      → src/pages/
// Components → src/components/
// Data       → src/data/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import BackgroundMesh from "./components/BackgroundMesh";

import HomePage from "./pages/Homepage";
import ChmodPage from "./pages/ChmodPage";
import ChsecPage from "./pages/ChsecPage";
import BinwalkPage from "./pages/BinwalkPage";
import LabPage from "./pages/LabPage";
import CreditsPage from "./pages/CreditsPage";

const PAGES = {
  home:    (props) => <HomePage {...props} />,
  chmod:   ()     => <ChmodPage />,
  checksec: ()    => <ChsecPage />,
  binwalk: ()     => <BinwalkPage />,
  lab:     ()     => <LabPage />,
  credits: ()     => <CreditsPage />,
};

export default function App() {
  const [section, setSection] = useState("home");

  const Page = PAGES[section] ?? PAGES.home;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #1a0f2e 0%, #0a0512 50%, #000000 100%)",
        color: "#F0F6FC",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlobalStyles />
      <BackgroundMesh />

      <Navbar section={section} setSection={setSection} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Page setSection={setSection} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
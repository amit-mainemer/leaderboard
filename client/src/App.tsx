import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LeaderboardProvider } from "./state/leaderboard.context";
import { ToasterProvider } from "./state/toaster.context";
import { Users } from "./pages/Users";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import "./index.css";
import { LeaderboardModal } from "./components/Leaderboard/LeaderboardModal";

const App: React.FC = () => {
  return (
    <Router>
      <ToasterProvider>
        <LeaderboardProvider>
          <>
            <Navbar />
            <Container sx={{ mt: 3 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
              </Routes>
            </Container>
            <LeaderboardModal />
          </>
        </LeaderboardProvider>
      </ToasterProvider>
    </Router >
  );
}

export default App;

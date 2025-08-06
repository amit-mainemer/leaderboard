import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useLeaderboard } from "../state/leaderboard.context";
import { GameButton } from "./GameButton";

// Styled Components for game-like appearance
const GameNavbar = styled(AppBar)`
  background: rgba(75, 0, 130, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(75, 0, 130, 0.3);
  border-bottom: 2px solid rgba(255, 140, 0, 0.6);
  position: relative;
  
  @keyframes glow {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`;

const GameToolbar = styled(Toolbar)`
  min-height: 80px;
  display: flex;
  align-items: center;
`;



const Logo = styled(Typography)`
  color: #00ffff;
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

export const Navbar: React.FC = () => {
    const { openLeaderboard } = useLeaderboard();
    const navigate = useNavigate();
    return (
        <GameNavbar position="static">
            <GameToolbar>
                <Box sx={{ flex: 1 }}>
                    <Logo variant="h6">
                        🎮 Gaming Platform
                    </Logo>
                </Box>

                {/* Center section - Navigation buttons */}
                <Box sx={{ display: 'flex', gap: 2, margin: 2, justifyContent: 'center', flex: 1 }}>
                    <GameButton onClick={() => navigate("/")}>
                        Home
                    </GameButton>
                    <GameButton onClick={() => navigate("/users")}>
                        Users
                    </GameButton>
                    <GameButton onClick={openLeaderboard}>
                        Leaderboard
                    </GameButton>
                </Box>

                {/* Right section - Spacer to balance the layout */}
                <Box sx={{ flex: 1 }} />
            </GameToolbar>
        </GameNavbar>
    );
};
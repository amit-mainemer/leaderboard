import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { LeaderboardList } from "./LeaderboardList";
import { useLeaderboard } from "../../state/leaderboard.context";

const LeaderboardContainer = styled(Box)`
  color: #fff;
  border-radius: 20px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
`;

const LeaderboardTitle = styled(Typography)`
  position: absolute;
  top: 54px;
  left: 32%;
  right: 0;
  z-index: 1;
  width: 33%;
  font-weight: bold;
  color: #4b0082;
  margin-top: 10px;
`;

const CloseButton = styled(Box)`
  position: absolute;
  top: 53px;
  width: 70px;
  height: 70px;
  right: 14px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Leaderboard: React.FC = () => {
  const { closeLeaderboard } = useLeaderboard();
  return (
    <LeaderboardContainer>
      <LeaderboardTitle variant="h4">Leaderboard</LeaderboardTitle>

      <CloseButton onClick={() => closeLeaderboard()} />

       <LeaderboardList />
    </LeaderboardContainer>
  );
};

export default Leaderboard;

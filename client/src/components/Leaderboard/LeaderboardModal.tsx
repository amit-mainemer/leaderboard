import { Modal, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import Leaderboard from "./Leaderboard";
import { useLeaderboard } from "../../state/leaderboard.context";
import bannerImage from "../../assets/banner.png";

const AnimatedModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  height: 750px;
  padding-top: 20px;
  background-image: url(${bannerImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  
  /* Animation for fade in from bottom to top */
  animation: slideInFromBottom 0.2s ease-out;
  
  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translate(-50%, -30%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

export const LeaderboardModal: React.FC = () => {
    const {  isLeaderboardOpen, closeLeaderboard } = useLeaderboard();

    return (
        <Modal 
            open={isLeaderboardOpen} 
            onClose={closeLeaderboard}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}


        >
            <AnimatedModalContent>
                <Leaderboard />
            </AnimatedModalContent>
        </Modal>
    );
};





import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useLeaderboard } from "../../state/leaderboard.context";
import crownGold from "../../assets/crown.png";
import crownSilver from "../../assets/silverCrown.png";
import crownCopper from "../../assets/copperCrown.png";
import purpleCrown from "../../assets/purpleCrown.png";
import { Avatar } from "../Avatar";

interface ListRowProps {
  index: number;
  style: React.CSSProperties;
  isActive?: boolean;
}

const ListItem = styled(Box) <{ highlight?: boolean; active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  height: 60px;

  background-color: ${({ highlight }) =>
    highlight ? "rgba(255, 215, 0, 0.1)" : "transparent"};
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  
  ${({ active }) => active && `
    box-shadow: 
      0 0 10px rgba(255, 215, 0, 0.6),
      0 0 20px rgba(255, 215, 0, 0.4),
      0 0 30px rgba(255, 215, 0, 0.2),
      inset 0 0 20px rgba(255, 215, 0, 0.1);
    border: 2px solid rgba(255, 215, 0, 0.8);
    border-radius: 8px;
    animation: activeGlow 2s ease-in-out infinite alternate;
    
    @keyframes activeGlow {
      from {
        box-shadow: 
          0 0 10px rgba(255, 215, 0, 0.6),
          0 0 20px rgba(255, 215, 0, 0.4),
          0 0 30px rgba(255, 215, 0, 0.2),
          inset 0 0 20px rgba(255, 215, 0, 0.1);
      }
      to {
        box-shadow: 
          0 0 15px rgba(255, 215, 0, 0.8),
          0 0 25px rgba(255, 215, 0, 0.6),
          0 0 35px rgba(255, 215, 0, 0.4),
          inset 0 0 25px rgba(255, 215, 0, 0.15);
      }
    }
  `}
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  `;

const PositionCrown = styled(Box) <{ rank: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  margin-right: 16px;
  position: relative;
  font-size: 24px;
  background-image: ${({ rank }) => {
    if (rank === 1) return `url(${crownGold})`;
    if (rank === 2) return `url(${crownSilver})`;
    if (rank === 3) return `url(${crownCopper})`;
    return `url(${purpleCrown})`;
  }};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

`;

const RankNumber = styled(Typography) <{ rank: number }>`
  font-weight: bold;
  font-size: ${({ rank }) => rank <= 3 ? '1.3rem' : '1rem'};
  position: relative;
  z-index: 2;
  
  ${({ rank }) => rank <= 3 ? `
    color: #ffffff;
    text-shadow: 
      0 0 10px rgba(255, 215, 0, 0.8),
      0 0 20px rgba(255, 215, 0, 0.6),
      0 0 30px rgba(255, 215, 0, 0.4),
      2px 2px 4px rgba(0, 0, 0, 0.8),
      -1px -1px 2px rgba(255, 255, 255, 0.3);
    
    -webkit-text-stroke: 1px rgba(75, 0, 130, 0.8);
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
    animation: glow 2s ease-in-out infinite alternate;
    
    @keyframes glow {
      from {
        text-shadow: 
          0 0 10px rgba(255, 215, 0, 0.8),
          0 0 20px rgba(255, 215, 0, 0.6),
          0 0 30px rgba(255, 215, 0, 0.4),
          2px 2px 4px rgba(0, 0, 0, 0.8),
          -1px -1px 2px rgba(255, 255, 255, 0.3);
      }
      to {
        text-shadow: 
          0 0 15px rgba(255, 215, 0, 1),
          0 0 25px rgba(255, 215, 0, 0.8),
          0 0 35px rgba(255, 215, 0, 0.6),
          2px 2px 4px rgba(0, 0, 0, 0.8),
          -1px -1px 2px rgba(255, 255, 255, 0.3);
      }
    }
  ` : `
    color: #fff;
  `}
`;

const PlayerInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 24px;
  flex: 1;
`;

const GemsDisplay = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #00ffff;
  font-weight: bold;
  margin-left: auto;
  background-color: #40095C;
  border-radius: 8px;
  padding: 4px 8px;
  
  &::before {
    content: '💎';
    font-size: 1rem;
  }
`;

const MAX_LENGTH = 18;

export const ListRow: React.FC<ListRowProps> = ({ index, style, isActive }) => {

  const { leaderboard } = useLeaderboard();

  const user = leaderboard?.[index];
  if (!user) return null;

  return (
    <ListItem style={style} highlight={user.rank ? user.rank <= 3 : false} active={isActive}>
      <PositionCrown rank={user.rank || 0}>
        <RankNumber rank={user.rank || 0}>
          {user.rank}
        </RankNumber>
      </PositionCrown>
      <PlayerInfo>
        <Avatar src={user.imageUrl ? `/avatars/${user.imageUrl}` : "/avatars/1.jpg"} />
        <Typography variant="subtitle1" fontWeight="bold" color="#fff">
          {user.username.length > MAX_LENGTH
            ? user.username.slice(0, MAX_LENGTH) + "..."
            : user.username}
        </Typography>
      </PlayerInfo>
      <GemsDisplay>
        {user.score.toString().length > MAX_LENGTH
          ? user.score.toString().slice(0, MAX_LENGTH) + "..."
          : user.score}
      </GemsDisplay>
    </ListItem>
  );
}
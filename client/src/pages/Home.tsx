import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const characterGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(255, 255, 255, 0.8),
      0 0 10px rgba(255, 255, 255, 0.6),
      0 0 15px rgba(255, 255, 255, 0.4),
      0 0 20px rgba(255, 255, 255, 0.2);
  }
  50% {
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 1),
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(255, 255, 255, 0.6),
      0 0 40px rgba(255, 255, 255, 0.4),
      0 0 50px rgba(255, 255, 255, 0.2);
  }
`;

const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const HomeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
`;

const WelcomeText = styled(Typography)`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 2s ease-out, ${characterGlow} 3s ease-in-out infinite, ${floatingAnimation} 4s ease-in-out infinite;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 15px rgba(255, 255, 255, 0.4),
    0 0 20px rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubtitleText = styled(Typography)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  animation: ${fadeInUp} 2s ease-out 0.5s both;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const DecorativeElement = styled(Box)`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  border-radius: 2px;
  animation: ${fadeInUp} 2s ease-out 1s both, ${characterGlow} 3s ease-in-out infinite 1s;
  margin: 2rem 0;
`;



export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <WelcomeText variant="h1">
        Welcome Back
      </WelcomeText>
      
      <SubtitleText variant="h4">
        Ready to continue your gaming journey?
      </SubtitleText>
      
      <DecorativeElement />
    </HomeContainer>
  );
};

export default Home;
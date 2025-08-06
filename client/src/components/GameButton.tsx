import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

export const GameButton = styled(Button)<ButtonProps>`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.9) 0%, rgba(255, 69, 0, 0.9) 100%);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 24px;
  margin: 0 16px;
  border-radius: 25px;
  border: 2px solid #ff8c00;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 140, 0, 1) 0%, rgba(255, 69, 0, 1) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.5);
    border-color: #00ffff;
    
    &::before {
      left: 100%;
    }
  }

  &:disabled {
    background: linear-gradient(135deg, rgba(128, 128, 128, 0.6) 0%, rgba(64, 64, 64, 0.6) 100%);
    color: rgba(255, 255, 255, 0.5);
    border-color: rgba(128, 128, 128, 0.5);
    box-shadow: 0 2px 8px rgba(128, 128, 128, 0.2);
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      background: linear-gradient(135deg, rgba(128, 128, 128, 0.6) 0%, rgba(64, 64, 64, 0.6) 100%);
      transform: none;
      box-shadow: 0 2px 8px rgba(128, 128, 128, 0.2);
      border-color: rgba(128, 128, 128, 0.5);
    }
  }
`;
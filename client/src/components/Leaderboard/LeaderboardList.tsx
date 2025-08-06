import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FixedSizeList as List } from "react-window";
import { useLeaderboard } from "../../state/leaderboard.context";
import { ListRow } from "./ListRow";
import { GameButton } from "../GameButton";

const ListContainer = styled(Box)`
  height: 500px;
  width: 460px;
  overflow: hidden;
  border-radius:  0 0 10px 10px;
  margin-top: 134px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ListHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #fff;
  font-weight: bold;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
  background-color: #40095C;
  justify-content: space-between;
`;


const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
`;

const Header = styled(Box)`
  font-size: 18px;

`;

const StyledList = styled(List)`
  /* Custom Scrollbar Styling */
    background: rgba(75, 0, 130, 0.1);

  &::-webkit-scrollbar {
    width: 12px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(75, 0, 130, 0.3);
    border-radius: 6px;
    margin: 4px;
    border: 1px solid rgba(255, 215, 0, 0.2);
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    border-radius: 6px;
    border: 2px solid rgba(75, 0, 130, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
      transform: scale(1.05);
    }
    
    &:active {
      background: linear-gradient(135deg, #ff8c00 0%, #ffd700 100%);
      box-shadow: 0 1px 4px rgba(255, 140, 0, 0.6);
    }
  }
  
  &::-webkit-scrollbar-corner {
    background: rgba(75, 0, 130, 0.3);
  }
  
  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #ffd700 rgba(75, 0, 130, 0.3);
`;

export const LeaderboardList: React.FC = () => {
  const {
    leaderboard,
    activeUser,
    nextPage,
    fetchLeaderboardForUser,
    clearActiveUser } = useLeaderboard();
  const [userId, setUserId] = useState<string>("");
  const listRef = useRef<List>(null);

  const ITEM_HEIGHT = 60;
  const ITEM_COUNT = leaderboard?.length || 0;
  const LIST_HEIGHT = 360;

  const handleScroll = useCallback(({ scrollOffset }: any) => {

    if (activeUser) {
      // TODO: implement
      console.log("If active user don't fetch next page")
      return;
    }

    const maxScrollOffset = (ITEM_COUNT * ITEM_HEIGHT) - LIST_HEIGHT;

    if (scrollOffset >= maxScrollOffset) {
      nextPage();
    }

  }, [leaderboard, nextPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }

  const handleClear = () => {
    setUserId("");
    clearActiveUser();
  }

  useEffect(() => {
    if (activeUser && leaderboard) {
      const activeIndex = leaderboard.findIndex(user => user.id === activeUser.id);
      if (activeIndex !== -1 && listRef.current) {
        listRef.current.scrollToItem(activeIndex, 'center');
      }
    }
  }, [activeUser, leaderboard]);


  if (!leaderboard || leaderboard.length === 0) {
    return (
      <ListContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography color="#fff">No leaderboard data available</Typography>
        </Box>
      </ListContainer>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchLeaderboardForUser(userId);
    }
  }


  return (
    <ListContainer>
      <SearchContainer>

        <TextField
          label="Enter User ID"
          variant="outlined"
          sx={{ width: "100%" }}
          value={userId}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: userId && (
              <IconButton
                onClick={handleClear}
              >
                <CloseIcon />
              </IconButton>
            )
          }}
        />

        <GameButton
          variant="contained"
          color="primary"
          disabled={!userId}
          onClick={() => fetchLeaderboardForUser(userId)}>Search</GameButton>
      </SearchContainer>

      <Box>
        <ListHeader>
          <Header>Rank</Header>
          <Divider orientation="vertical" color="white" flexItem />
          <Header>Player</Header>
          <Divider orientation="vertical" color="white" flexItem />

          <Header>Score</Header>
        </ListHeader>
        <StyledList
          ref={listRef}
          height={LIST_HEIGHT}
          itemCount={ITEM_COUNT}
          itemSize={ITEM_HEIGHT}
          onScroll={handleScroll}
          width="100%"
        >
          {({ index, style }) => <ListRow index={index} isActive={activeUser?.id === leaderboard[index].id} style={style} />}
        </StyledList>
      </Box>

    </ListContainer>
  );
};
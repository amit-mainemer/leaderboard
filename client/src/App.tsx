import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

function App() {
  const [data, setData] = useState<any[]>([]);

  const fetchLeaderboard = async () => {
    const res = await fetch("http://localhost:4000/api/leaderboard");
    const json = await res.json();
    setData(json);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Leaderboard <SportsEsportsIcon />
      </Typography>
      <Button variant="contained" onClick={fetchLeaderboard}>Load Leaderboard</Button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.username} - {user.score}</li>
        ))}
      </ul>
    </Container>
  );
}

export default App;

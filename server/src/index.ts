import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint
app.get("/api/leaderboard", (req, res) => {
  res.json([{ id: 1, username: "Player1", score: 1000 }]);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

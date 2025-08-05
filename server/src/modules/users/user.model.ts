import { db, redis, logger } from "../../services";

export async function createUser(name: string, score: number): Promise<number> {
  // Create user and score in one transaction
  const newUser = await db.user.create({
    data: {
      username: name,
      score: {
        create: { score }
      }
    },
    include: { score: true }
  });

  await redis.zadd("leaderboard", score, String(newUser.id));
  logger.info("User created", { userId: newUser.id, name, score });

  return newUser.id;
}

export async function updateUserScore(
  userId: number,
  score: number,
  action: "add" | "remove"
): Promise<number> {
  // Fetch current score
  const userScore = await db.score.findUnique({
    where: { userId }
  });

  if (!userScore) {
    throw new Error("User not found");
  }

  // Calculate new score
  const newScore =
    action === "add"
      ? userScore.score + score
      : Math.max(0, userScore.score - score);

  // Update DB
  await db.score.update({
    where: { userId },
    data: { score: newScore }
  });

  // Update Redis
  await redis.zadd("leaderboard", newScore, String(userId));
  logger.info("User score updated", { userId, newScore, action });

  return newScore;
}

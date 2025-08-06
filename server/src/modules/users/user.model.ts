import { db } from "../../services";

export async function createUser(name: string, score: number, image: string): Promise<number> {
  const newUser = await db.user.create({
    data: {
      username: name,
      score: {
        create: { score }
      },
      imageUrl: image
    },
    include: { score: true }
  });

  return newUser.id;
}

export async function updateUserScore(
  userId: number,
  amount: number,
  action: "add" | "remove"
): Promise<number> {
  const userScore = await db.score.findUnique({
    where: { userId }
  });

  if (!userScore) {
    throw new Error("User not found");
  }

  const newScore =
    action === "add"
      ? userScore.score + amount
      : Math.max(0, userScore.score - amount);

  console.log({ newScore, userScore, amount })

  await db.score.update({
    where: { userId },
    data: { score: newScore }
  });

  return newScore;
}


export async function getUsersTotalCount() {
  const totalCount = await db.user.count();
  return totalCount;
}

export async function getUser(userId: number): Promise<any> {
  const user = await db.user.findUnique({
    where: { id: userId },
  });
  return user;
}
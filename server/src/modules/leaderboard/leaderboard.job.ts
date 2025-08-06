import { logger } from "../../services";
import { getLeaderboard as getLeaderboardFromDB } from "./leaderboard.model";
import { updateAllLeaderboard } from "./leaderboard.cache";

let intervalId: NodeJS.Timeout | null = null;
let isRunning = false;
const JOB_INTERVAL = 5 * 60 * 1000; // 5 min


export async function refreshCache(): Promise<void> {
  try {
    logger.info("[LeaderboardJob] Starting full cache refresh");
    
    const startTime = Date.now();
    const {users} = await getLeaderboardFromDB(Number.MAX_SAFE_INTEGER, 0);


    await updateAllLeaderboard(users);
    
    const duration = Date.now() - startTime;
    logger.info(`[LeaderboardJob] Full cache refresh completed in ${duration}ms. Updated ${users.length} users`);
  } catch (error) {
    logger.error("[LeaderboardJob] Failed to refresh cache:", error);
    throw error;
  }
}


export function startPeriodicRefresh(): void {
  if (isRunning) {
    logger.warn("[LeaderboardJob] Periodic refresh is already running");
    return;
  }

  logger.info(`[LeaderboardJob] Starting periodic cache refresh every ${JOB_INTERVAL / 60 * 1000} minutes`);

  refreshCache().catch(error => {
    logger.error("[LeaderboardJob] Initial cache refresh failed:", error);
  });

  intervalId = setInterval(async () => {
    try {
      await refreshCache();
    } catch (error) {
      logger.error("[LeaderboardJob] Scheduled cache refresh failed:", error);
    }
  }, JOB_INTERVAL);

  isRunning = true;
}






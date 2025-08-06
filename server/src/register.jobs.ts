import { logger } from "./services";
import { startPeriodicRefresh as startLeaderboardJob } from "./modules/leaderboard/leaderboard.job";



export const registerJobs = () => {
    logger.info("Registering jobs");
    startLeaderboardJob();
};
import React, { createContext, useContext, useState, useEffect } from "react";
import { getLeaderboard, getUserLeaderboard } from "../api";
import type { LeaderboardUser } from "../../../common/types";
import { useToaster } from "./toaster.context";

type LeaderboardContextType = {
    isLeaderboardOpen: boolean;
    leaderboard: LeaderboardUser[];
    loading: boolean;
    page: number;
    activeUser: LeaderboardUser | null;
    openLeaderboard: () => void;
    closeLeaderboard: () => void;
    setLimit: (limit: number) => void
    nextPage: () => Promise<void>;
    refreshLeaderboard: (limit?: number) => Promise<void>;
    fetchLeaderboardForUser: (userId: string) => Promise<void>;
    clearActiveUser: () => void;
};

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardProvider = ({ children }: { children: React.ReactElement }) => {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(100)
    const [loading, setLoading] = useState(false);
    const [activeUser, setActiveUser] = useState<LeaderboardUser | null>(null);
    const { showToast } = useToaster();

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const data = await getLeaderboard({ limit, page });

            if (page > 0) {
                setLeaderboard(prev => [...prev, ...data.users]);
            } else {
                setLeaderboard(data.users);
                setTotalUsers(data.total_users);
            }
        } catch (err) {
            console.error("Failed to load leaderboard", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLeaderboardForUser = async (userId: string) => {
        try {
            const data = await getUserLeaderboard(userId);
            setActiveUser(data.user)
            setLeaderboard(data.leaderboard)
        } catch (err) {
            console.error("Failed to load leaderboard for user", err);
            showToast("User not found", "error");
        }
    }

    const clearActiveUser = () => {
        setActiveUser(null);
        setPage(0);
        fetchLeaderboard();
    }

    const nextPage = async () => {
        if (leaderboard.length >= totalUsers) return;
        setPage(page + 1);
        fetchLeaderboard();
    }
    
    const openLeaderboard = () => {
        setIsLeaderboardOpen(true);
        fetchLeaderboard();
    }

    const closeLeaderboard = () => {
        setIsLeaderboardOpen(false);
        setLeaderboard([]);
        setPage(0);
        setLimit(100);
        setActiveUser(null);
    }

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <LeaderboardContext.Provider value={{
            loading,
            page,
            isLeaderboardOpen,
            leaderboard,
            activeUser,
            nextPage,
            setLimit,
            openLeaderboard,
            closeLeaderboard,
            fetchLeaderboardForUser,
            refreshLeaderboard: () => fetchLeaderboard(),
            clearActiveUser,
        }}>
            {children}
        </LeaderboardContext.Provider>
    );
};

export const useLeaderboard = () => {
    const context = useContext(LeaderboardContext);
    if (!context) throw new Error("useLeaderboard must be used within a LeaderboardProvider");
    return context;
};

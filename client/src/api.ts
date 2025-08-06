import axios, { AxiosError } from "axios";
import type { LeaderboardResponse, UserRankResponse, LeaderboardRequest } from "../../common/types";

const api = axios.create({
    baseURL: "/api", // Proxy to backend
    timeout: 5000,
});

// Generic request handler
async function request<T>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any
): Promise<T> {
    try {
        const response = await api.request<T>({ method, url, data });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ error?: string }>;
        let message = "Something went wrong";

        if (error.response?.data?.error) {
            message = error.response.data.error;
        } else if (error.message) {
            message = error.message;
        }

        console.error(`[API ERROR] ${method.toUpperCase()} ${url}:`, message);
        throw new Error(message);
    }
}

const Api = {
    // Generic methods
    get: <T>(url: string) => request<T>("get", url),
    post: <T>(url: string, data?: any) => request<T>("post", url, data),
    put: <T>(url: string, data?: any) => request<T>("put", url, data),
    delete: <T>(url: string) => request<T>("delete", url),
};


export const createUser = (name: string, score: number, image: string) => Api.post("/users", { name, score, image })

export const updateScore = (userId: string, amount: number, action: "add" | "remove") =>
    Api.put(`/users/${userId}`, { amount, action })


export const getLeaderboard = ({limit, page}: LeaderboardRequest): Promise<LeaderboardResponse> => 
    Api.get(`/leaderboard?limit=${limit}&page=${page}`)

export const getUserLeaderboard = (userId: string): Promise<UserRankResponse> => 
    Api.get(`/leaderboard/user/${userId}`)
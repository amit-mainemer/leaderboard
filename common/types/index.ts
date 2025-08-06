// Common types shared between client and server

// Leaderboard types
export interface LeaderboardUser {
    id: number;
    username: string;
    score: number;
    rank: number | null;
    createdAt?: Date;
    imageUrl?: string;
}

export interface LeaderboardResponse {
    users: LeaderboardUser[];
    total_users: number;
    page: number;
}

export interface UserRankResponse {
    leaderboard: LeaderboardUser[];
    total_users: number;
    user: LeaderboardUser;
}

export interface LeaderboardRequest {
    limit: number;
    page: number;
    search?: string;
    orderBy?: string;
}

// User types
export interface User {
    id: number;
    username: string;
    createdAt: Date;
    imageUrl?: string;
    avatar?: string;
}

export interface UserScore {
    userId: number;
    score: number;
}

// API Response types
export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Game types
export interface GameScore {
    userId: number;
    score: number;
    timestamp: Date;
}

// Validation types
export interface ValidationError {
    field: string;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
} 

export type Action = "add" | "remove";
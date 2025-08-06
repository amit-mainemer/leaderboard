import { User } from "@common/types";

export const isString = (value: any): value is string => typeof value === "string";
export const isUser = (value: any): value is User => typeof value === "object" && value !== null && "id" in value && "username" in value;
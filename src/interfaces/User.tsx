import { Role } from "../enum/Role";

export interface User {
    id: number;
    username: String;
    email: String;
    dob: String;
    gender: String;
    password: String;
    roles: Role[];
    enabled: boolean;
    accountNonLocked: boolean;
    phNo: String;
    createdAt: Date;
    updatedAt: Date;
}
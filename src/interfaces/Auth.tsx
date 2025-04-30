import { Role } from "../enum/Role";
import { User } from "./User";

export interface ISuccessfulLoginResponse {
    user: User;
    token: String;
}

export interface ILoginRequest {
    username: string;
    password: string;
    role: Role
}
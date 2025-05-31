import { ILoginRequest, ISuccessfulLoginResponse } from "../interfaces/Auth";
import { apiPublic } from "../config/axios";

class AuthService {

    static async login(loginReq: ILoginRequest) {
        const response = await apiPublic.post<ISuccessfulLoginResponse>("/login", loginReq);
        return response.data;
    }

}

export default AuthService;
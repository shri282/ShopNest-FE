import { ILoginRequest, ISuccessfulLoginResponse } from "../interfaces/Auth";
import { apiPublic } from "../config/axios";
import { LOGIN_URL } from "../constants/apiEndPoints";

class AuthService {

    static async login(loginReq: ILoginRequest) {
        const response = await apiPublic.post<ISuccessfulLoginResponse>(LOGIN_URL, loginReq);
        return response.data;
    }

}

export default AuthService;
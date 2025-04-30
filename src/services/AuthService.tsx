import axios from "axios";
import { ILoginRequest, ISuccessfulLoginResponse } from "../interfaces/Auth";

class AuthService {

    static async login(loginReq: ILoginRequest) {
        const response = await axios.post<ISuccessfulLoginResponse>("http://localhost:8080/login", loginReq, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    }

}

export default AuthService;
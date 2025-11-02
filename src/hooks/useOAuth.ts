import { useEffect } from "react";
import { useAuthContext } from "../context/auth";

const BE_BASEURL = process.env.REACT_APP_BACKEND_URL;

export const useOAuth = () => {
    const { authContextAction } = useAuthContext();

    const oauthLogin = (provider: string) => {
        let url = '';
        switch (provider) {
            case 'google':
                url = `${BE_BASEURL}/auth/oauth/google/start`;
                break;
            case 'github':
                url =  `${BE_BASEURL}/auth/oauth/github/start`;
                break;
            case 'facebook':
                url =  `${BE_BASEURL}/auth/oauth/facebook/start`;
                break;

            default:
                throw new Error('Unsupported OAuth provider');
        }

        window.open(url, 'oauth_popup', 'width=500,height=600');
    }

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'http://localhost:8080' || !event.data) return;
            const {token, user} = event.data;
            const parsedUser = JSON.parse(user);
            authContextAction.login({ token, user: parsedUser });
        }

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        }
    }, [authContextAction])

    return {
        oauthLogin,
    };
};
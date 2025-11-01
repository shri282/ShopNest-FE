import { useEffect } from "react";
import { useAuthContext } from "../context/auth";

export const useOAuth = () => {
    const { authContextAction } = useAuthContext();

    const oauthLogin = (provider: string) => {
        let url = '';
        switch (provider) {
            case 'google':
                url = 'http://localhost:8080/auth/oauth/google/start';
                break;
            case 'github':
                url = 'http://localhost:8080/auth/oauth/github/start';
                break;
            case 'facebook':
                url = 'http://localhost:8080/auth/oauth/facebook/start';
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
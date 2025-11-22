import AuthService from "../services/AuthService";
import { useAsyncHandler } from "./useAsyncHandler";
import { ILoginRequest } from "../interfaces/Auth";
import { useAuthContext } from "../context/auth";
import { useNotification } from "../context/notification";

export const useLogin = () => {
  const { authContextAction } = useAuthContext();
  const asyncHandler = useAsyncHandler();
  const { showMessage } = useNotification();

  const login = async (formData: ILoginRequest) => {
    try {
      await asyncHandler.run(async () => {
        const res = await AuthService.login(formData);
        res.user.activeRole = formData.role;
        authContextAction.login(res);
      });
    } catch (error: any) {
      showMessage(error.message, "Error");
    }
  };

  return {
    login,
    ...asyncHandler,
  };
};

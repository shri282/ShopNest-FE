import { useRoutes } from "react-router-dom";
import routes from "./routes";

function AppRouter({ role }: { role: string }) {
  const routeConfig = role === "USER" ? routes.userRoutes : routes.sellerRoutes;
  return useRoutes(routeConfig);
}

export default AppRouter;

import { useRoutes } from 'react-router-dom'
import routes from './routes'

function AppRouter() {
  return useRoutes(routes);
}

export default AppRouter;
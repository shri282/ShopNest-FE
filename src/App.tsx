import './App.css';
import { AuthProvider } from './context/auth';
import { NotificationProvider } from './context/notification';
import AppRouter from './routes/AppRouter';
import AuthRouter from './routes/AuthRouter';

// #TODO: specifications for product, coupon apply and shipping cost feature
// order summary, charges, order tracking, delivery partner assignment.
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationProvider>
          <AuthRouter />
          <AppRouter />
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

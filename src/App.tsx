import './App.css';
import Shopnest from './app/Shopnest';
import { AuthProvider } from './context/auth';
import { NotificationProvider } from './context/notification';

// #TODO: specifications for product, coupon apply and shipping cost feature
// order summary, charges, order tracking, delivery partner assignment.
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationProvider>
          <Shopnest />
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

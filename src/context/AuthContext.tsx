import { createContext } from 'react'
import { User } from '../interfaces/User';

interface AuthContextType {
  user: User | null;
  token: String | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
import { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { token, user } = await api.login({ email, password });
    api.token = token; setUser(user);
  };

  const register = async (name, email, password) => {
    const { token, user } = await api.register({ name, email, password });
    api.token = token; setUser(user);
  };

  const logout = () => { api.token = null; setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
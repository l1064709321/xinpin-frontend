import { createContext, useContext, useState, useEffect } from 'react';
import { authApi, usersApi } from '../api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('xp_token');
    if (token) {
      usersApi.profile()
        .then((res) => setUser(res.data))
        .catch(() => { localStorage.removeItem('xp_token'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const smsLogin = async (phone, code) => {
    const res = await authApi.smsLogin(phone, code);
    localStorage.setItem('xp_token', res.data.token);
    localStorage.setItem('xp_refresh', res.data.refreshToken);
    setUser(res.data.user);
    return res;
  };

  const register = async (data) => {
    const res = await authApi.register(data);
    localStorage.setItem('xp_token', res.data.token);
    localStorage.setItem('xp_refresh', res.data.refreshToken);
    setUser(res.data.user);
    return res;
  };

  const login = async (phone, password) => {
    const res = await authApi.login({ phone, password });
    localStorage.setItem('xp_token', res.data.token);
    localStorage.setItem('xp_refresh', res.data.refreshToken);
    setUser(res.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('xp_token');
    localStorage.removeItem('xp_refresh');
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, smsLogin, login, register, logout, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);

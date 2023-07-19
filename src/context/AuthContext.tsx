import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';
import { ShopUser } from '../types/User';
import { User } from 'firebase/auth';

type AuthContextType = {
  user?: ShopUser;
  uid?: string;
  login: () => Promise<void | User>;
  logout: () => Promise<void | undefined>;
};

const AuthContext = createContext<AuthContextType>({ user: {} as any, uid: '', login, logout });

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ShopUser>();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  if (user) {
    return (
      <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  } else return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
}
export const aaa = 'ff';

export function useAuthContext() {
  return useContext(AuthContext);
}

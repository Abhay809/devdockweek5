
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types/auth';
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Mock login function (would be replaced with real auth in production)
  const login = (email: string, password: string) => {
    // For demo purposes, just accept any email/password
    if (email && password) {
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
      });
      
      toast.success("Logged in successfully!");
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      toast.error("Invalid credentials");
    }
  };

  // Mock register function
  const register = (name: string, email: string, password: string) => {
    if (name && email && password) {
      const user: User = {
        id: '1',
        email,
        name,
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
      });
      
      toast.success("Registered successfully!");
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      toast.error("Please fill in all fields");
    }
  };

  // Logout function
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    
    toast.success("Logged out successfully!");
    localStorage.removeItem('user');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
        });
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

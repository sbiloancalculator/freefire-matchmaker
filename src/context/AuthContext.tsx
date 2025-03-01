
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType, User } from '@/lib/types';
import { toast } from 'sonner';

// Mock user data for the prototype
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    freefireId: '12345678',
    walletBalance: 100,
    status: 'active' as const,
    createdAt: new Date()
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ffuser');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('ffuser');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Remove the password before storing the user
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('ffuser', JSON.stringify(userWithoutPassword));
      toast.success('Login successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, freefireId: string = '') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists in mock data
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }

      // Create new user
      const newUser: User = {
        id: (MOCK_USERS.length + 1).toString(),
        name,
        email,
        freefireId, // This is now optional in the User interface
        walletBalance: 0,
        status: 'active',
        createdAt: new Date()
      };

      // Add to mock data (in a real app, this would be a server call)
      // We need to add the password here, which isn't part of the User type
      const newUserWithPassword = { ...newUser, password };
      MOCK_USERS.push(newUserWithPassword);
      
      setUser(newUser);
      localStorage.setItem('ffuser', JSON.stringify(newUser));
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ffuser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

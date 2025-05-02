
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, PlusCircle, Home, Info, LogIn, UserPlus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/submit', label: 'Submit Event', icon: PlusCircle },
    { path: '/about', label: 'About', icon: Info },
  ];

  const authItems = isAuthenticated
    ? []
    : [
        { path: '/signin', label: 'Sign In', icon: LogIn },
        { path: '/register', label: 'Register', icon: UserPlus },
      ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-tech-primary" />
            <span className="font-bold text-xl text-tech-primary">TechEventHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                asChild
                className={cn(
                  "py-2",
                  isActive(item.path) && "bg-tech-primary hover:bg-tech-primary/90"
                )}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {user?.name}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log out
                </Button>
              </div>
            ) : (
              authItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  asChild
                  className={cn(
                    "py-2",
                    isActive(item.path) && "bg-tech-primary hover:bg-tech-primary/90"
                  )}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))
            )}
          </nav>
        </div>
      </header>
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </div>

      <footer className="bg-tech-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold">TechEventHub</span>
            </div>

            <div className="flex md:hidden space-x-4 mb-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "text-white/80 hover:text-white",
                    isActive(item.path) && "text-white font-medium"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} TechEventHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

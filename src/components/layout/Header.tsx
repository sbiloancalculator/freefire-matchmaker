
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const openLoginModal = () => {
    setAuthView("login");
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthView("register");
    setIsAuthModalOpen(true);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo className="animate-float" />
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-foreground/80"
              )}
            >
              Home
            </Link>
            <Link
              to="/tournaments"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/tournaments") ? "text-primary" : "text-foreground/80"
              )}
            >
              Tournaments
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/dashboard") ? "text-primary" : "text-foreground/80"
                )}
              >
                Dashboard
              </Link>
            )}
            {user?.status === "admin" && (
              <Link
                to="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/admin") ? "text-primary" : "text-foreground/80"
                )}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{user?.name}</span>
                </div>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={openLoginModal}>
                  Log in
                </Button>
                <Button onClick={openRegisterModal}>Sign up</Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium hover:bg-accent",
                isActive("/") ? "text-primary" : "text-foreground/80"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tournaments"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium hover:bg-accent",
                isActive("/tournaments") ? "text-primary" : "text-foreground/80"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tournaments
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:bg-accent",
                  isActive("/dashboard") ? "text-primary" : "text-foreground/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {user?.status === "admin" && (
              <Link
                to="/admin"
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:bg-accent",
                  isActive("/admin") ? "text-primary" : "text-foreground/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="block px-3 py-2 text-base font-medium text-foreground">
                    {user?.name}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      openLoginModal();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      openRegisterModal();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </header>
  );
};

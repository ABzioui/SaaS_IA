import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuItems = [
    {
      label: 'Tableau de bord',
      path: '/properties-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Propriétés',
      path: '/properties-dashboard',
      icon: 'Building2'
    }
  ];

  const isActiveRoute = (path) => {
    if (path === '/properties-dashboard') {
      return location.pathname === '/properties-dashboard' || 
             location.pathname === '/add-property' ||
             location.pathname === '/edit-property' ||
             location.pathname === '/property-details';
    }
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div 
            className="flex items-center cursor-pointer transition-micro hover:opacity-80"
            onClick={() => handleNavigation('/properties-dashboard')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">PropManager</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-micro ${
                isActiveRoute(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} className="mr-2" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center p-2 rounded-full hover:bg-muted transition-micro"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-1100">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Utilisateur</p>
                    <p className="text-xs text-muted-foreground">user@propmanager.com</p>
                  </div>
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Paramètres
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-micro"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} className="mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Overlay for user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavigationHeader;
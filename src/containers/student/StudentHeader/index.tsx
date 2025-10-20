import React, { useCallback, useEffect, useState } from 'react';

import {
  BarChart3,
  Bell,
  FileText,
  LogOut,
  PenTool,
  Settings,
  TriangleAlert,
  User,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { pathnames } from 'routes';

import Button from 'components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/DropdownMenu';

import useAuth from 'containers/auth/AuthProvider/useAuth';

// FIXME: api
const notifications = [
  {
    id: 1,
    message:
      'You have a reminder from your teacher: Your "Climate Change Impact Essay" has a high AI usage of 41%.',
    type: 'alert',
  },
];

export function StudentHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutAction } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [currentView, setCurrentView] = useState<'home' | 'analytics'>('home');
  useEffect(() => {
    if (location.pathname === pathnames.home()) {
      setCurrentView('home');
    } else if (location.pathname === pathnames.analytics()) {
      setCurrentView('analytics');
    }
  }, [location.pathname]);

  const onViewChange = useCallback(
    (view: 'home' | 'analytics') => {
      if (view === currentView) {
        return;
      }
      if (view === 'analytics') {
        navigate(pathnames.analytics());
        return;
      }
      navigate(pathnames.home());
    },
    [currentView, navigate],
  );

  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case 'alert':
        return <TriangleAlert className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  }, []);

  const handleEditProfile = useCallback(() => {
    console.log('Edit Profile clicked');
    alert('Profile editing feature coming soon!');
  }, []);

  const handleLogout = useCallback(() => {
    logoutAction();
  }, [logoutAction]);

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-4 max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-shrink-0  w-[250px]">
            <PenTool className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-lg sm:text-2xl font-bold">GAILA</h1>
            <span className="hidden sm:inline text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              For Students
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button
              className="gap-2 w-full sm:w-auto justify-start"
              onClick={() => {
                onViewChange('home');
                setIsOpen(false);
              }}
              variant={currentView === 'home' ? 'default' : 'ghost'}
            >
              <FileText className="h-4 w-4" />
              My Essays
            </Button>
            <Button
              className="gap-2 w-full sm:w-auto justify-start"
              onClick={() => {
                onViewChange('analytics');
                setIsOpen(false);
              }}
              variant={currentView === 'analytics' ? 'default' : 'ghost'}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Button>
          </nav>

          <div className="flex-shrink-0 w-[250px] flex gap-4 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Bell className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map(notification => (
                  <DropdownMenuItem key={notification.id}>
                    {getNotificationIcon(notification.type)}
                    <span>{notification.message}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEditProfile}>
                  <Settings className="h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default StudentHeader;

import React, { useCallback, useEffect, useState } from 'react';

import {
  BarChart3,
  FileText,
  LogOut,
  PenTool,
  User,
  Users,
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

type TeacherCurrentView = 'home' | 'assignments' | 'analytics';

export function TeacherHeader() {
  const { logoutAction } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentView, setCurrentView] = useState<TeacherCurrentView | null>(
    null,
  );
  useEffect(() => {
    if (location.pathname === pathnames.home()) {
      setCurrentView('home');
    } else if (location.pathname === pathnames.assignments()) {
      setCurrentView('assignments');
    } else if (location.pathname === pathnames.analytics()) {
      setCurrentView('analytics');
    }
  }, [location.pathname]);

  const onViewChange = useCallback(
    (view: TeacherCurrentView) => {
      if (view === currentView) {
        return;
      }
      if (view === 'assignments') {
        navigate(pathnames.assignments());
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

  const handleProfileEdit = () => {
    window.alert('Profile editing coming soon!');
  };

  const handleLogout = useCallback(() => {
    logoutAction();
  }, [logoutAction]);

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-4 max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between gap-4 relative">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 w-[250px]">
            <PenTool className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-lg sm:text-2xl font-bold">GAILA</h1>
            <span className="hidden lg:inline text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              For Teachers
            </span>
          </div>

          {/* Centered Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button
              className="gap-2"
              onClick={() => onViewChange('home')}
              size="sm"
              variant={currentView === 'home' ? 'default' : 'ghost'}
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">My Classes</span>
            </Button>
            <Button
              className="gap-2"
              onClick={() => onViewChange('assignments')}
              size="sm"
              variant={currentView === 'assignments' ? 'default' : 'ghost'}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
            </Button>
            <Button
              className="gap-2"
              onClick={() => onViewChange('analytics')}
              size="sm"
              variant={currentView === 'analytics' ? 'default' : 'ghost'}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
          </nav>

          {/* User Menu */}
          <div className="flex-shrink-0 w-[250px] flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p>Teacher Name</p>
                    <p className="text-xs text-muted-foreground">
                      teacher@school.edu
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleProfileEdit}
                >
                  <User className="h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
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

export default TeacherHeader;

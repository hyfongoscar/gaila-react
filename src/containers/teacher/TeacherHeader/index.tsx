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

import DropdownMenu from 'components/display/DropdownMenu';
import Button from 'components/input/Button';

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

  // TODO: profile edit, profile details in menu
  const handleMenuClick = useCallback(
    (key: string) => {
      if (key === 'profile') {
        window.alert('Profile editing coming soon!');
      } else if (key === 'logout') {
        logoutAction();
      }
    },
    [logoutAction],
  );

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
            <DropdownMenu
              items={[
                {
                  type: 'text',
                  label: (
                    <div className="flex flex-col space-y-1">
                      <p>Teacher Name</p>
                      <p className="text-xs text-muted-foreground">
                        teacher@school.edu
                      </p>
                    </div>
                  ),
                },
                { type: 'divider' },
                {
                  key: 'profile',
                  icon: <User className="h-4 w-4" />,
                  label: <span>Edit Profile</span>,
                },
                {
                  key: 'logout',
                  icon: <LogOut className="h-4 w-4" />,
                  label: <span>Logout</span>,
                },
              ]}
              onClick={handleMenuClick}
            >
              <User className="h-4 w-4" />
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TeacherHeader;

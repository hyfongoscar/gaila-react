import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Box from '@mui/material/Box';

import Clickable from 'components/input/Clickable';

type Props = {
  children: React.ReactNode;
  initWidth?: number;
  minWidth?: number;
  maxWidth?: number;
};

const ResizableSidebar = ({
  children,
  initWidth = 350,
  minWidth = 250,
  maxWidth = 600,
}: Props) => {
  const [sidebarWidth, setSidebarWidth] = useState(initWidth);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = window.innerWidth - e.clientX - 48;
      if (newWidth > minWidth && newWidth < maxWidth) {
        setSidebarWidth(newWidth);
      }
    },
    [maxWidth, minWidth],
  );

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (!children) return null;

  if (Children.count(children) < 2) return children;

  return (
    <div className="relative flex h-full">
      <Box sx={{ width: `calc(100% - ${sidebarWidth}px)` }}>{children[0]}</Box>
      <Clickable
        className="absolute flex justify-center w-8 !cursor-col-resize"
        onMouseDown={handleMouseDown}
      >
        <div className="h-full w-[1px] !bg-gray-200" />
      </Clickable>
      <Box sx={{ width: sidebarWidth }}>{children[1]}</Box>
    </div>
  );
};

export default ResizableSidebar;

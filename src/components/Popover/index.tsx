import React, { type ComponentProps } from 'react';

import MuiPopover from '@mui/material/Popover';
import clsx from 'clsx';

import Button from 'components/Button';

type Props = {
  buttonText: React.ReactNode;
  buttonVariant?: ComponentProps<typeof Button>['variant'];
  childClass?: string;
  buttonClass?: string;
  className?: string;
  children: React.ReactNode;
};

const Popover = ({
  buttonText,
  buttonVariant = 'secondary',
  childClass,
  buttonClass,
  className,
  children,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        className={buttonClass}
        onClick={handleClick}
        variant={buttonVariant}
      >
        {buttonText}
      </Button>
      <MuiPopover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={className}
        id={id}
        onClose={handleClose}
        open={open}
      >
        <div
          className={clsx(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
            childClass,
          )}
        >
          {children}
        </div>
      </MuiPopover>
    </>
  );
};

export default Popover;

import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

type DeprecatedInputTypes = 'number' | 'search' | 'tel' | 'url';

type Props<T extends React.HTMLInputTypeAttribute> = React.ComponentProps<
  typeof TextField
> & {
  icon?: React.ReactNode;
  type?: T extends DeprecatedInputTypes ? never : T;
};

const TextInput = <T extends React.HTMLInputTypeAttribute>({
  className,
  label,
  multiline,
  size = multiline ? 'medium' : 'small',
  variant = 'filled',
  type,
  icon,
  ...props
}: Props<T>) => {
  return (
    <TextField
      className={clsx(['w-full', className])}
      label={label}
      multiline={multiline}
      size={size}
      slotProps={{
        input: {
          disableUnderline: true,
          ...(icon
            ? {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }
            : {}),
        },
      }}
      sx={{
        ...(label
          ? {}
          : {
              '& .MuiInputBase-root': {
                paddingTop: 1,
              },
              '& .MuiInputBase-input': {
                paddingTop: 0,
              },
            }),
        ...props.sx,
      }}
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export default TextInput;

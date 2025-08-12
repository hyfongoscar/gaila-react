import React from 'react';

import MuiButton from '@mui/material/Button';

type Props = {
  label: string;
  onClick?: () => void;
} & React.ComponentProps<typeof MuiButton>;

const Button = ({ label, onClick, ...props }: Props) => {
  return (
    <MuiButton onClick={onClick} {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;

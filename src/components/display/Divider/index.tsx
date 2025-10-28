import React, { memo } from 'react';

import MuiDivider from '@mui/material/Divider';

function Divider({
  className,
  ...props
}: React.ComponentProps<typeof MuiDivider>) {
  return (
    <MuiDivider
      className={className}
      data-slot="separator-root"
      sx={{ mb: 2, ...props.sx }}
      {...props}
    />
  );
}

export default memo(Divider);

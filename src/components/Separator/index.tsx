import React, { memo } from 'react';

import clsx from 'clsx';
import { Separator as RadixSeparator } from 'radix-ui';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof RadixSeparator.Root>) {
  return (
    <RadixSeparator.Root
      className={clsx(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export default memo(Separator);
